'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * controller for overall functions of the app that aren't handled elsewhere, namely
 * the logout function that invalidates the user token.
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
