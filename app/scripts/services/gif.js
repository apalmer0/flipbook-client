'use strict';

/**
 * @ngdoc service
 * @name flipbookApp.gif
 * @description
 * # gif
 * factory for storing gif data- namely, gif frames, which will be reset frequently,
 * and gif gallery, which will be populated with the user's gifs.
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
