'use strict';

/**
 * @ngdoc directive
 * @name flipbookApp.directive:frame
 * @description
 * when the user saves a frame of a gif, this code gets run. it creates
 * the thumbnail of the created frame. this is done by actually creating a new
 * canvas and drawing within it the most recently-saved image
 */
angular.module('flipbookApp')
  .directive('frame', function () {
    return {
      templateUrl: 'views/frame.html',
      restrict: 'A',
      link: function postLink(scope, element) {
        console.log('frame.js');
        console.log(scope);
        console.log(element);
        var canvas = element[0].firstChild;
        var ctx = canvas.getContext('2d');
        // create new canvas
        ctx.canvas.width  = 100;
        ctx.canvas.height = 100;
        // create a new empty image
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function() {
          // put the image inside the canvas
          ctx.drawImage(img, 0, 0, 100, 100);
        };
        // make the image src that of the frame's location
        img.src = scope.image.location;
        element.on('click',function(){
          element.toggleClass('clicked');
        });
      }
    };
  });
