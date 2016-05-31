'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:FrameCtrl
 * @description
 * # FrameCtrl
 * what frames will we use in the gif? after creating the frames, they get populated
 * in the bottom row of the 'create gif' page. some css/jquery shows the selected
 * frames, and this controller actually populates an array of image urls (not the images
 * themselves) for use in the gif creator.
 */
angular.module('flipbookApp')
  .controller('FrameCtrl', ['gif', function (gif) {

    // when the user clicks the image thumbnail, it calls this function and passes
    // in the selected image.
    this.selectImage = function(image) {
      console.log('selectimage');

      // this attempts to find the image in a list of images
      var index = gif.frames.indexOf(image.location);

      if (index > -1) {
        // if the image is already present, remove it from the list (the click
        // was to 'de-select' the image)
        gif.frames.splice(index);
      } else {
        // otherwise, add the image to the list.
        gif.frames.push(image.location);
      }
      // let's just confirm we've got what we're looking for.
      console.log(gif.frames);
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
