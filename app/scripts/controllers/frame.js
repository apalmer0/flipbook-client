'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:FrameCtrl
 * @description
 * # FrameCtrl
 * Controller of the flipbookApp
 */
angular.module('flipbookApp')
  .controller('FrameCtrl', ['gif', '$element', function (gif, $element) {

    this.viewImage = function(image) {

      var index = gif.frames.indexOf(image.location);

      if (index > -1) {
        gif.frames.splice(index);
      } else {
        gif.frames.push(image.location);
      }
      console.log(gif.frames);
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
