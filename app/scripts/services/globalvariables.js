'use strict';

/**
 * @ngdoc service
 * @name flipbookApp.globalVariables
 * @description
 * # globalVariables
 * Value in the flipbookApp.
 */
angular.module('flipbookApp')
  .value('globalVariables', {
    baseUrl: document.location.hostname === 'localhost' ?
      'http://localhost:3000' :
      'http://flipbook-api.herokuapp.com/#/',
  });
