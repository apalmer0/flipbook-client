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

    // used to toggle whether the gif or the options are being shown
    // default is to show options, not gif
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
      // when you make the gif, show the gif panel and hide the options
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
      // when you kill the gif, hide the gif panel and show the options
      showObj.show = false;
    };

    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string

        // needs refactoring - this is the same code as in createimage.js
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

      // in createimage.js, we created a blob using the dataURl from the canvas.
      // here, we create a blob using the saved-gif source itself, which is the AWS url
      var gifBlob = dataURItoBlob(gifObject.src);

      // and do the same saving process - append it to formdata.
      var fd = new FormData($event.target);
      fd.append("gif[src]", gifObject.src);
      fd.append("gif[file]", gifBlob);

      var uploadUrl = globalVariables.baseUrl + '/gifs';

      $http.post(uploadUrl, fd, {
        // Angular’s default transformRequest function will try to serialize our
        // FormData object, so we override it with the identity function to leave
        // the data intact. Angular’s default Content-Type header for POST and
        // PUT requests is application/json, so we want to change this, too. By
        // setting ‘Content-Type’: undefined, the browser sets the Content-Type
        // to multipart/form-data for us and fills in the correct boundary. Manually
        // setting ‘Content-Type’: multipart/form-data will fail to fill in the
        // boundary parameter of the request.
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
