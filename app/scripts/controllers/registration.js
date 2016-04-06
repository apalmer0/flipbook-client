'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the flipbookApp
 */

angular.module('flipbookApp')
  .controller('RegistrationCtrl', ['authenticationSvc', function (authenticationSvc) {
    console.log('hey from signup');
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var controller = this;
    controller.user = {};

    this.signup = function(){
      var user = controller.user;
      authenticationSvc.signUp(user);
    };
  }]);
