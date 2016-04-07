'use strict';

/**
 * @ngdoc service
 * @name flipbookApp.gif
 * @description
 * # gif
 * Factory in the flipbookApp.
 */
angular.module('flipbookApp')
  .factory('gif', ['$http', 'authenticationSvc', 'globalVariables',
  function ($http, authenticationSvc, globalVariables) {
    console.log('gif factory');
    var user = authenticationSvc.getUserInfo();
    // Service logic

    var gifFactory = {
      frames: [],
      gallery: []
    };

    $http({
      method: 'get',
      url: globalVariables.baseUrl + '/gifs',
      headers: {
        Authorization: 'Token token=' + user.token,
      }
    }).success(function(data){
      console.log('gif index successful');
      console.log(data);
      gifFactory.gallery = [];
      for (let i = 0; i < data.gifs.length; i++) {
        gifFactory.gallery.push(data.gifs[i]);
      }
    });

    // Public API here
    return gifFactory;
  }]);
