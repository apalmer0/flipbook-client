'use strict';

/**
 * @ngdoc directive
 * @name flipbookApp.directive:gif
 * @description
 * when the user opens the gallery, this code gets run. it renders the individual
 * gif thumbnail for use in the gif gallery. this is done by actually creating a new
 * canvas and drawing within it that gif, but since it only gets drawn once, it looks
 * like a snapshot of the first frame.
 */
angular.module('flipbookApp')
  .directive('gif', function () {
    return {
      templateUrl: 'views/gif.html',
      restrict: 'A',
      link: function postLink(scope, element) {
        console.log('gif.js');
        var canvas = element[0].firstElementChild;
        var ctx = canvas.getContext('2d');
        // create new canvas
        ctx.canvas.width  = 150;
        ctx.canvas.height = 150;
        // create new empty image
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function() {
          // put the image inside the canvas
          ctx.drawImage(img, 0, 0, 150, 150);
        };
        // make the image src that of the gif's location
        img.src = scope.gif.location;
      }
    };
  });
