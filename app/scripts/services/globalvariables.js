'use strict';

/**
 * @ngdoc service
 * @name flipbookApp.globalVariables
 * @description
 * sets a 'baseurl' for the site that will toggle the location of the api
 * depending on whether the app is being run locally or not
 */
angular.module('flipbookApp')
  .value('globalVariables', {
    baseUrl: document.location.hostname === 'localhost' ?
      'http://localhost:3000' :
      'http://flipbook-api.herokuapp.com',
  });
