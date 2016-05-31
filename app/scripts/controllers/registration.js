'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * controller handling registering user and passing collected data to user service, where
 * user is registered in and token created/associated with user.
 */

angular.module('flipbookApp')
  .controller('RegistrationCtrl', ['authenticationSvc', function (authenticationSvc) {
    console.log('hey from signup');
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // save this controller to a variable to access it within future functions' scopes
    var controller = this;
    controller.user = {};

    // when sign up submit button is clicked, this function is called
    this.signup = function(){
      var user = controller.user;
      authenticationSvc.signUp(user);
    };
  }]);
