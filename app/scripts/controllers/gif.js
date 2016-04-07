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
  .controller('GifCtrl', ['authenticationSvc', 'gif', 'globalVariables', '$http', function (authenticationSvc, gif, globalVariables, $http) {
    console.log('gif controller loaded');
    var user = authenticationSvc.getUserInfo();

    var gifObject;

    this.makeGif = function() {
      console.log('make gif function');
      console.log(gif.frames);
      gifshot.createGIF({
          // 'images': gif.frames,
          // this will work, once i've figured out CORS
          'images':
          [
            // 'https://s3.amazonaws.com/apalmer0/2016-04-06/a649e2d3cd574db1193c20991447c9b8-blob?X-Amz-Date=20160407T114826Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=db4375bc40fa4a3db4f9151b2f63511d3a8c53bdd2d6223af917328504c0ed31&X-Amz-Credential=ASIAI24XMAWFZRIML6ZQ/20160407/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=FQoDYXdzEJz//////////wEaDOhSFyAdaSzwhH/xOyLLATR5%2BzCo6LkHf%2B8wAQt47RYOgTiOqfQ1ygRcuD6VhQD7QqJsGTwVP4KN1caJwzXJHHM8Edc%2BeI0Nf8FXIxirRrBm8oJhP78XZXlEaC8EEadhIbsTdkim4SWCtPZY%2BLBP12Anrv1iFxr0cElZbQmWvol7/pndXd5u9QHIL9PqV80oYO7dqPyiEekw22pa5vIJY0u0aHviBaTPJl/Tp13SYjY6ACTuAEBCoef7A1UISdvqsIg/FcTZXSPRRqdFsnrT3yQyeWd3JOUpqfgUKJSUl7gF',
            'http://i.imgur.com/2OO33vX.jpg',
            'http://i.imgur.com/qOwVaSN.png',
            'http://i.imgur.com/Vo5mFZJ.gif'
          ],
          interval: 0.3,
          numFrames: 6,
          text: 'wooooooooooooo',
          fontWeight: 'bold',
          fontFamily: 'Arial',
          fontColor: '#ff5cef',
          textBaseline: 'center'
      },function(obj) {
          if(!obj.error) {
            var image = obj.image,
            animatedImage = document.createElement('img');
            animatedImage.src = image;
            gifObject = animatedImage;
            document.getElementById("gif-goes-here").appendChild(animatedImage);
          }
      });
    };

    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        } else {
            byteString = decodeURI(dataURI.split(',')[1]);
        }
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }

    this.saveGif = function($event) {
      console.log('save gif function');
      // var show = (typeof gifObject !== "undefined");

      var gifBlob = dataURItoBlob(gifObject.src);
      var fd = new FormData($event.target);
      fd.append("gif[file]", gifBlob);

      var uploadUrl = globalVariables.baseUrl + '/gifs';

      $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined,
            // Authorization: 'Token token=' + user.token,
          }
      }).success(function(data){
        console.log('success');
        console.log(data);
      });

    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
