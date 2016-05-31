'use strict';

/**
 * @ngdoc directive
 * @name flipbookApp.directive:sidebar
 * @description
 * load the sidebar html
 */
angular.module('flipbookApp')
  .directive('sidebar', function () {
    return {
      templateUrl: 'views/sidebar.html',
      restrict: 'E',
    };
  });
