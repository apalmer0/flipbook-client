'use strict';

/**
 * @ngdoc service
 * @name flipbookApp.savedImages
 * @description
 * # savedImages
 * Factory in the flipbookApp.
 */
angular.module('flipbookApp')
  .factory('savedImages', function () {
    // Service logic
    // ...

    var imageCollection = {
      images: []
    };

    // Public API here
    return {
      imagesMethod: function () {
        return imageCollection;
      }
    };
  });
