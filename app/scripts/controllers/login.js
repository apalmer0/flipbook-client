'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * controller handling logging user in and passing collected data to user service, where
 * user is logged in and token created/associated with user.
 */

angular.module('flipbookApp')
  .controller('LoginCtrl', ['$http', 'globalVariables', 'User', 'authenticationSvc', function ($http, globalVariables, User, authenticationSvc) {
    console.log('login controller');
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // save this controller to a variable to access it within future functions' scopes
    var controller = this;
    controller.user = {};

    // when login submit button is clicked, this function is called
    this.logUserIn = function(){
      var user = controller.user;
      authenticationSvc.login(user);
    };
  }]);
