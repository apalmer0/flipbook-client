'use strict';

/**
 * @ngdoc function
 * @name flipbookApp.controller:GalleryCtrl
 * @description
 * # GalleryCtrl
 * the gif gallery shows all the gifs a specific user has created. along with that
 * are a number of functions one can do with each gif; specifically: get all gifs,
 * edit one gif, or delete one gif.
 */
angular.module('flipbookApp')
  .controller('GalleryCtrl', ['$scope', '$http', 'globalVariables', 'gif', '$location', 'authenticationSvc',
  function ($scope, $http, globalVariables, gif, $location, authenticationSvc) {
    console.log('gallery controller loaded');
    // which user are we dealing with here? will be used when accessing the gallery -
    // we only want the specific user's gifs, not everybody's.
    var user = authenticationSvc.getUserInfo();

    // save this controller to a variable to access it within future functions' scopes
    var controller = this;


    this.getGifs = function() {
      console.log('getting gifs');
      // get request for all the gifs a user has saved
      $http({
        method: 'get',
        url: globalVariables.baseUrl + '/gifs',
        headers: {
          Authorization: 'Token token=' + user.token,
        }
      }).success(function(data){
        console.log('gif index successful');
        console.log(data);
        // needs refactoring - currently this empties the gallery array before
        // repopulating it with the gifs retrieved by the request. just ensures
        // that the user doesn't accidentally access other's gifs if using the same
        // browser.
        gif.gallery = [];
        for (var j = 0; j < data.gifs.length; j++) {
          gif.gallery.push(data.gifs[j]);
        }
      });
    };

    // call this function when the controller loads, ie after the view renders
    // when the user clicks the #/gifs link on the sidebar.
    this.getGifs();
    this.gifGallery = function(){
      return gif.gallery;
    };

    // the 'view' button calls this function, which changes the view state to that
    // of the specific chosen gif
    this.viewGif = function(gif) {
      $location.path('/gifs/'+gif.id);
    };

    // the 'delete' button calls this function, which 1) finds and removes the
    // selected gif element from the DOM, and 2) deletes its record from the database.
    // it doesn't 1) confirm with the user that this was intentional or 2) remove the
    // record from AWS, both of which need to be improved.
    this.deleteGif = function(gif) {
      console.log('delete gif');

      var index = controller.gifGallery().indexOf(gif);

      $http({
        method: 'delete',
        url: globalVariables.baseUrl + '/gifs/' + gif._id,
        headers: {
          Authorization: 'Token token=' + user.token,
        }
      }).success(function(){
        console.log('delete gif successful');
        controller.gifGallery().splice(index, 1);
      });
    };

    // the 'edit' button calls this function, which sends a patch request with
    // new form data to update the name and comment. needs both the gif itself
    // as well as the triggering event in order to capture the new data.
    this.editGif = function(gif, $event) {
      console.log('edit gif');
      console.log($event.target);
      var fd = new FormData($event.target);

      $http({
        method: 'patch',
        url: globalVariables.baseUrl + '/gifs/' + gif._id,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          Authorization: 'Token token=' + user.token,
        },
        data: fd
      }).success(function(data){
        console.log('edit gif successful');
        console.log(data);
      });
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
