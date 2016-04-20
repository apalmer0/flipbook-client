'use strict';

/**
 * @ngdoc directive
 * @name flipbookApp.directive:sidebar
 * @description
 * # sidebar
 */
angular.module('flipbookApp')
  .directive('sidebar', function () {
    console.log('sidebar.js');
    return {
      templateUrl: '../views/sidebar.html',
      // restrict: 'E',
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the sidebar directive');
      // }
    };
  });
