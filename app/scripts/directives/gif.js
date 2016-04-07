'use strict';

/**
 * @ngdoc directive
 * @name flipbookApp.directive:gif
 * @description
 * # gif
 */
angular.module('flipbookApp')
  .directive('gif', function () {
    return {
      templateUrl: '../views/gif.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var canvas = element[0].firstElementChild;
        var ctx = canvas.getContext('2d');
        ctx.canvas.width  = 150;
        ctx.canvas.height = 150;
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function() {
          ctx.drawImage(img, 0, 0, 150, 150);
        };
        img.src = scope.gif.location;
        // element.on('click',function(){
        //   element.toggleClass('clicked');
        // });
      }
    };
  });
