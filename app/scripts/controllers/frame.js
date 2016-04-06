'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:FrameCtrl
 * @description
 * # FrameCtrl
 * Controller of the flipbookApp
 */
angular.module('flipbookApp')
  .controller('FrameCtrl', function () {

    this.viewImage = function(image) {
      var canvas = document.getElementById("canvasEl");
      var ctx = canvas.getContext('2d');
      var img = new Image();
      img.onload = function() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = image.location;
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
