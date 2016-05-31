'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:ViewgifCtrl
 * @description
 * # ViewgifCtrl
 * users can view the gif in place, in the app, using these functions. this also allows users
 * to view those gifs in the aws url directly.
 */
angular.module('flipbookApp')
  .controller('ViewgifCtrl', ['$http', 'globalVariables','authenticationSvc', '$routeParams', '$location',
  function ($http, globalVariables, authenticationSvc, $routeParams, $location) {
    console.log('view gif controller');
    var user = authenticationSvc.getUserInfo();

    // save this controller to a variable to access it within future functions' scopes
    var controller = this;

    // when the viewgif controller loads (when the user clicks the 'view' button),
    // this get request automatically runs and extracts the gif id
    // using the $routeParams service
    $http({
      method: 'get',
      url: globalVariables.baseUrl + '/gifs/' + $routeParams.id,
      headers: {
        Authorization: 'Token token=' + user.token,
      }
    }).success(function(gifData){
      // gifData is a gif object with gif attributes (comment, name, url, etc) attributes
      console.log('get gif successful');
      console.log(gifData);
      controller.gif = gifData;
      // upon success, create an img dom element named 'animatedImage'
      var animatedImage = document.createElement('img');
      // and set the src of that img as the gif's url - it's technically an image,
      // the image just happens to be a gif... ie, animatedImage
      animatedImage.src = gifData.gif.src;
      // once you've got the animatedImage, plug it in where dictated.
      document.getElementById("show-single-gif-here").appendChild(animatedImage);
    });

    // not really a 'go back' button, per se, but a 'go to gifs page' button
    this.goBack = function() {
      $location.path('/gifs');
    };

    // opens the gif in a separate tab using the gif's location as the url.
    this.viewAtUrl = function(gif) {
      console.log('view');
      console.log(gif);
      window.open(gif.location, '_blank');
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
