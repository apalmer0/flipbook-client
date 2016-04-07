'use strict';

// const gifshot = require('gifshot');
// import 'gifshot' from 'gifshot';

/**
 * @ngdoc function
 * @name flipbookApp.controller:GifCtrl
 * @description
 * # GifCtrl
 * Controller of the flipbookApp
 */
angular.module('flipbookApp')
  .controller('GifCtrl', ['globalVariables', '$http', function (globalVariables, $http) {
    console.log('gif controller loaded');


    this.makeGif = function() {
      console.log('make gif function');
      gifshot.createGIF({
          'images':
          [
            'http://i.imgur.com/2OO33vX.jpg', 
            'http://i.imgur.com/qOwVaSN.png',
            'http://i.imgur.com/Vo5mFZJ.gif'
          ],
          interval: 0.3,
          numFrames: 6,
          text: 'wooooooooooooo',
          fontFamily: 'Arial',
          textBaseline: 'center'
      },function(obj) {
          if(!obj.error) {
            var image = obj.image,
            animatedImage = document.createElement('img');
            animatedImage.src = image;
            document.getElementById("gif-goes-here").appendChild(animatedImage);
          }
      });
      // $http({
      //   method: 'post',
      //   url: globalVariables.baseUrl + '/gifs',
      //   data: {
      //     images: ['http://i.imgur.com/2OO33vX.jpg', 'http://i.imgur.com/qOwVaSN.png', 'http://i.imgur.com/Vo5mFZJ.gif']
      //   }
      // }).success(function(data){
      //   console.log(data);
      // });
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
