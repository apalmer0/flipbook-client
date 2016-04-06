'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flipbookApp
 */
angular.module('flipbookApp')
  .controller('MainCtrl', ['authenticationSvc', function (authenticationSvc) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    this.logout = function() {
      authenticationSvc.logout();
    };
  }]);
