'use strict';

/**
 * @ngdoc service
 * @name flipbookApp.gif
 * @description
 * # gif
 * Factory in the flipbookApp.
 */
angular.module('flipbookApp')
  .factory('gif', function () {
    console.log('gif factory');
    // Service logic

    var gifFactory = {
      frames: [],
      gallery: []
    };

    // Public API here
    return gifFactory;
  });
