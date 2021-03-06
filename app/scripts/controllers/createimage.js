'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:CreateimageCtrl
 * @description
 * # CreateimageCtrl
 * responsible for taking image data off canvas, turning it into a blob,
 * adding it to formdata with basic image info, and shipping the whole thing
 * to the api, so the api can save the record of the image and save the image
 * itself to AWS.
 */
angular.module('flipbookApp')
  .controller('CreateimageCtrl', ['$http', 'globalVariables', 'authenticationSvc', 'savedImages',
    function ($http, globalVariables, authenticationSvc, savedImages) {
    console.log('create image');
    var user = authenticationSvc.getUserInfo();
    var canvas = document.getElementById("canvasEl");
    var ctx = canvas.getContext('2d');

    // needs refactoring - this is the same code as in gif.js
    // takes dataURI from the canvas element and turns it into a blob to append to formData
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

        // woot - we've got a blob now!
        return new Blob([ia], {type:mimeString});
    }

    // take the image from the canvas and save it as a 'frame' of a future gif
    this.saveFrame = function($event){
      // take canvas data and extract dataURL
      var dataURL = canvas.toDataURL();
      // convert dataURL to blob - 'proto-file'
      var blob = dataURItoBlob(dataURL);

      // 'fake' form - it's just a hidden field with a submit button. kinda hacky.
      var fd = new FormData($event.target);
      // append blob to form data
      fd.append("image[file]", blob);


      var uploadUrl = globalVariables.baseUrl + '/images';

      console.log(user);
      console.log(savedImages.images);

      // ajax post request - send file to images url
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
      }).success(function(savedFrameData){
        // woot. file saved - add it to the pile and clear the canvas!
        savedImages.images.push(savedFrameData.file);
        console.log(savedFrameData.file.location);
        console.log(savedImages.images);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 300, 300);
      });
    };

    this.componentImages = savedImages.images;

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
