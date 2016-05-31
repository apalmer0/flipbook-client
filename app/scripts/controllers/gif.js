'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:GifCtrl
 * @description
 * # GifCtrl
 * controller for gif-specific functions - modifying attributes of gif, loading gifs from
 * saved urls, toggling gif attribute form and gif itself
 */
angular.module('flipbookApp')
  .controller('GifCtrl', ['authenticationSvc', 'gif', 'globalVariables', '$http', function (authenticationSvc, gif, globalVariables, $http) {
    console.log('gif controller loaded');
    var user = authenticationSvc.getUserInfo();

    // save this controller to a variable to access it within future functions' scopes
    var controller = this;

    // used to toggle whether the gif or the gif options are being shown
    // default is to show options, not gif
    var showObj = {
      show: false
    };

    this.product = showObj;

    var gifObject;

    // each of these will be used in part of gif-creation tool. instantiated as blank
    // to ensure default values.
    this.gifText = '';
    this.gifTextLocation = '';
    this.gifFontWeight = '';
    this.gifFontColor = '';


    this.makeGif = function() {
      console.log('make gif function');
      // when you make the gif, show the gif panel and hide the options
      showObj.show = true;

      // if there's currently a gif in place, remove it and create a new one.
      if ($("#gif-goes-here").children().length > 0) {
        $("#gif-goes-here").empty();
      }

      // access the gifshot tool, specifically the createGIF method, and pass in
      // the various variables and image frames from the gif service.
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
            // once the gif has been created, empty the gif frames factory so
            // the next gif won't have old frames included.
            gif.frames = [];
          }
      });
    };

    this.killGif = function() {
      $("#gif-goes-here").empty();
      // when you kill the gif, hide the gif panel and show the options
      showObj.show = false;
    };

    // needs refactoring - this is the same code as in createimage.js
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
