'use strict';

// const gifshot = require('gifshot');
// import 'gifshot' from 'gifshot';

/**
 * @ngdoc function
 * @name flipbookApp.controller:GifCtrl
 * @description
 * # GifCtrl
 * Controller of the flipbookApp
 */
angular.module('flipbookApp')
  .controller('GifCtrl', ['authenticationSvc', 'gif', 'globalVariables', '$http', function (authenticationSvc, gif, globalVariables, $http) {
    console.log('gif controller loaded');
    var user = authenticationSvc.getUserInfo();
    var controller = this;

    var showObj = {
      show: false
    };

    this.product = showObj;

    var gifObject;

    this.gifText = '';
    this.gifTextLocation = '';
    this.gifFontWeight = '';
    this.gifFontColor = '';


    this.makeGif = function() {
      console.log('make gif function');
      showObj.show = true;

      if ($("#gif-goes-here").children().length > 0) {
        $("#gif-goes-here").empty();
      }

      gifshot.createGIF({
        gifWidth: 300,
        gifHeight: 300,
        'images': gif.frames,
        interval: 0.3,
        text: controller.gifText,
        fontWeight: controller.gifFontWeight,
        fontFamily: 'Arial',
        fontColor: controller.gifFontColor,
        textBaseline: controller.gifTextLocation,
      },function(obj) {
          if(!obj.error) {
            var image = obj.image,
            animatedImage = document.createElement('img');
            animatedImage.src = image;
            gifObject = animatedImage;
            document.getElementById("gif-goes-here").appendChild(animatedImage);
            gif.frames = [];
          }
      });
    };

    this.killGif = function() {
      $("#gif-goes-here").empty();
      showObj.show = false;
    };

    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        } else {
            byteString = decodeURI(dataURI.split(',')[1]);
        }
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }

    this.saveGif = function($event) {
      console.log('save gif function');

      var gifBlob = dataURItoBlob(gifObject.src);
      var fd = new FormData($event.target);
      fd.append("gif[src]", gifObject.src);
      fd.append("gif[file]", gifBlob);

      var uploadUrl = globalVariables.baseUrl + '/gifs';

      $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined,
            Authorization: 'Token token=' + user.token,
          }
      }).success(function(data){
        console.log('success');
        showObj.show = false;
        controller.killGif();
        console.log(data);
      });

    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
