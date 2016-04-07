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

    var gifObject;

    this.makeGif = function() {
      console.log('make gif function');
      console.log(gif.frames);
      gifshot.createGIF({
          'images': gif.frames,
          interval: 0.3,
          numFrames: 6,
          text: 'wooooooooooooo',
          fontWeight: 'bold',
          fontFamily: 'Arial',
          fontColor: '#ff5cef',
          textBaseline: 'center'
      },function(obj) {
          if(!obj.error) {
            var image = obj.image,
            animatedImage = document.createElement('img');
            animatedImage.src = image;
            gifObject = animatedImage;
            document.getElementById("gif-goes-here").appendChild(animatedImage);
          }
      });
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
      // var show = (typeof gifObject !== "undefined");

      var gifBlob = dataURItoBlob(gifObject.src);
      var fd = new FormData($event.target);
      fd.append("gif[file]", gifBlob);

      var uploadUrl = globalVariables.baseUrl + '/gifs';

      $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined,
            // Authorization: 'Token token=' + user.token,
          }
      }).success(function(data){
        console.log('success');
        console.log(data);
      });

    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
