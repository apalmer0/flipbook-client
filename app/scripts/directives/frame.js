'use strict';

/**
 * @ngdoc directive
 * @name flipbookApp.directive:frame
 * @description
 * # frame
 */
angular.module('flipbookApp')
  .directive('frame', function () {
    return {
      templateUrl: '../views/frame.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        console.log(element[0].firstChild);
        var canvas = element[0].firstChild;
        var ctx = canvas.getContext('2d');
        ctx.canvas.width  = 100;
        ctx.canvas.height = 100;
        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0, 100, 100);
        };
        img.src = scope.image.location;
      }
    };
  });
