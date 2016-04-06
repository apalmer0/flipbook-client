'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the flipbookApp
 */

angular.module('flipbookApp')
  .controller('LoginCtrl', ['$http', 'globalVariables', 'User', 'authenticationSvc', function ($http, globalVariables, User, authenticationSvc) {
    console.log('login controller');
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var controller = this;
    controller.user = {};

    this.logUserIn = function(){
      var user = controller.user;
      authenticationSvc.login(user);
      console.log(user);
    };
  }]);
