'use strict';

/**
 * @ngdoc directive
 * @name flipbookApp.directive:sketch
 * @description
 * # sketch
 */
angular.module('flipbookApp')
  .directive('sketch', function () {
    return {
      restrict: 'A',
      link: function(scope, element, $http) {
        var canvas = document.getElementById("canvasEl");
        var ctx = canvas.getContext('2d');
        ctx.canvas.width  = 300;
        ctx.canvas.height = 300;

        $("#file_input").change(function(e){
            var URL = window.URL || window.URL;
            var url = URL.createObjectURL(e.target.files[0]);
            var img = new Image();
            img.src = url;

          img.onload = function() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            var img_width = img.width;
            var img_height = img.height;

            var new_x = 0;
            var new_y = 0;

            var canvas_size = 300;

            if (img_width > img_height) {
              new_x = canvas_size;
              new_y = (canvas_size * img_height) / img_width;
            } else if (img_height > img_width) {
              new_x = (canvas_size * img_width) / img_height;
              new_y = canvas_size;
            } else {
              new_x = canvas_size;
              new_y = canvas_size;
            }

            ctx.drawImage(img, 0, 0, new_x, new_y);
            console.log('should be loaded now...');
          };
        });


        // variable that decides if something should be drawn on mousemove
        var drawing = false;

        // the last coordinates before the current move
        var lastX;
        var lastY;
        var currentX;
        var currentY;

        element.bind('mousedown', function(event){

          lastX = event.offsetX;
          lastY = event.offsetY;

          // begins new line
          ctx.beginPath();

          drawing = true;
        });

        element.bind('mousemove', function(event){
          if(drawing){
            // get current mouse position
            currentX = event.offsetX;
            currentY = event.offsetY;

            draw(lastX, lastY, currentX, currentY);

            // set current coordinates to last one
            lastX = currentX;
            lastY = currentY;
          }

        });

        element.bind('mouseup', function(event) {
          // stop drawing
          drawing = false;
        });

        // canvas reset
        function reset() {
          element[0].width = element[0].width;
        }

        function draw(lX, lY, cX, cY){
          // line from
          ctx.moveTo(lX,lY);
          // to
          ctx.lineTo(cX,cY);
          // color
          ctx.strokeStyle = "#000";
          // draw it
          ctx.stroke();
        }

        function downloadCanvas(link, canvasId, filename) {
            link.href = canvas.toDataURL();
            link.download = filename;
        }

        document.getElementById('clear-image').addEventListener('click', function() {
          reset();
        }, false);

        document.getElementById('download').addEventListener('click', function() {
          console.log(this);
          downloadCanvas(this, 'canvas', 'image.png');
        }, false);

      },
    };
  });
