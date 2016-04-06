'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:CreateimageCtrl
 * @description
 * # CreateimageCtrl
 * Controller of the flipbookApp
 */
angular.module('flipbookApp')
  .controller('CreateimageCtrl', ['$http', 'globalVariables', 'User', 'savedImages',
    function ($http, globalVariables, User, savedImages) {
    console.log('create image');
    var canvas = document.getElementById("canvasEl");
    var ctx = canvas.getContext('2d');

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

    this.saveFrame = function($event){
      var dataURL = canvas.toDataURL();
      var blob = dataURItoBlob(dataURL);

      var fd = new FormData($event.target);
      fd.append("image[file]", blob);


      var uploadUrl = globalVariables.baseUrl + '/images';

      console.log(User);
      console.log(savedImages.images);

      $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined,
            Authorization: 'Token token=' + User.token,
          }
      }).success(function(data){
        savedImages.images.push(data.file);
        console.log(data.file.location);
        console.log(savedImages.images);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      });
    };

    this.componentImages = savedImages.images;

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
