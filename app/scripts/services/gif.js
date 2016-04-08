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

    // Public API here
    return gifFactory;
  }]);
