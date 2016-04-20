'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:ViewgifCtrl
 * @description
 * # ViewgifCtrl
 * Controller of the flipbookApp
 */
angular.module('flipbookApp')
  .controller('ViewgifCtrl', ['$http', 'globalVariables','authenticationSvc', '$routeParams', '$location',
  function ($http, globalVariables, authenticationSvc, $routeParams, $location) {
    console.log('view gif controller');
    var user = authenticationSvc.getUserInfo();

    var controller = this;

    $http({
      method: 'get',
      url: globalVariables.baseUrl + '/gifs/' + $routeParams.id,
      headers: {
        Authorization: 'Token token=' + user.token,
      }
    }).success(function(data){
      console.log('get gif successful');
      console.log(data);
      controller.gif = data;
      var animatedImage = document.createElement('img');
      animatedImage.src = data.gif.src;
      document.getElementById("show-single-gif-here").appendChild(animatedImage);
    });

    this.goBack = function() {
      $location.path('/gifs');
    };

    this.viewAtUrl = function(gif) {
      console.log('view');
      console.log(gif);
      window.open(gif.location, '_blank');
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
