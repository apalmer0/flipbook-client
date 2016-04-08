'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:GalleryCtrl
 * @description
 * # GalleryCtrl
 * Controller of the flipbookApp
 */
angular.module('flipbookApp')
  .controller('GalleryCtrl', ['$scope','$http', 'globalVariables', 'gif', 'authenticationSvc',
  function ($scope, $http, globalVariables, gif, authenticationSvc) {
    console.log('gallery controller loaded');
    var user = authenticationSvc.getUserInfo();

    var controller = this;

    this.gifGallery = function(){
      return gif.gallery;
    };

    this.viewGif = function(gif) {
      window.open(gif.location, '_blank');
    };

    this.deleteGif = function(gif) {
      console.log('delete gif');

      var index = controller.gifGallery().indexOf(gif);

      $http({
        method: 'delete',
        url: globalVariables.baseUrl + '/gifs/' + gif._id,
        headers: {
          Authorization: 'Token token=' + user.token,
        }
      }).success(function(){
        console.log('delete gif successful');
        controller.gifGallery().splice(index, 1);
      });
    };

    this.editGif = function(gif, $event) {
      console.log('edit gif');
      console.log($event.target);
      var fd = new FormData($event.target);

      $http({
        method: 'patch',
        url: globalVariables.baseUrl + '/gifs/' + gif._id,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          Authorization: 'Token token=' + user.token,
        },
        data: fd
      }).success(function(data){
        console.log('edit gif successful');
        console.log(data);
      });
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
