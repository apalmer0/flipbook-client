'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the flipbookApp
 */

angular.module('flipbookApp')
  .controller('LoginCtrl', ['$http', 'globalVariables', function ($http, globalVariables) {
    console.log('hey from login');
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var controller = this;
    controller.user = {};

    this.logUserIn = function(){
      console.log('login');
      console.log(controller.user);
      $http({
        method: 'post',
        url: globalVariables.baseUrl + '/sign-in',
        contentType: false,
        processData: false,
        data: controller.user,
      }).success(function(data){
        controller.user = {};
        console.log('logged in!');
        console.log(data);
      });
    };
  }]);
