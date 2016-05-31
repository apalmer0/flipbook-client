'use strict';

/**
 * @ngdoc service
 * @name flipbookApp.savedImages
 * @description
 * factory for storing individual frames of the gif in an array - specific elements
 * of this collection can be selected and used in the gif 
 */
angular.module('flipbookApp')
  .factory('savedImages', function () {
    // Service logic
    // ...

    var imageCollection = {
      images: []
    };

    // Public API here
    return imageCollection;
  });
