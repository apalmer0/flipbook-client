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
    // Service logic
    // ...

    var components = {
      frames: []
    };

    // Public API here
    return components;
  });
