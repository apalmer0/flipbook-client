'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the flipbookApp
 */

angular.module('flipbookApp')
  .controller('RegistrationCtrl', ['$http', 'globalVariables', function ($http, globalVariables) {
    console.log('hey from signup');
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var controller = this;
    controller.user = {};

    this.signup = function(){
      console.log('signup');
      console.log(controller.user);
      $http({
        method: 'post',
        url: globalVariables.baseUrl + '/sign-up',
        contentType: false,
        processData: false,
        data: controller.user,
      }).success(function(data){
        console.log('holy shit....');
        console.log(data);
      });
    };
  }]);
