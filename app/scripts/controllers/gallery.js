'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:GalleryCtrl
 * @description
 * # GalleryCtrl
 * Controller of the flipbookApp
 */
angular.module('flipbookApp')
  .controller('GalleryCtrl', ['$http', 'globalVariables', 'gif',
  function ($http, globalVariables, gif) {
    console.log('gallery controller loaded');

    this.gifGallery = function(){
      return gif.gallery;
    };

    this.viewGif = function(gif) {
      window.open(gif.location, '_blank');
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
