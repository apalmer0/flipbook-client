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
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the gif directive');
      // }
    };
  });
