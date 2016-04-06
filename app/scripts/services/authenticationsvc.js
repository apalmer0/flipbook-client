'use strict';

/**
 * @ngdoc service
 * @name flipbookApp.authenticationSvc
 * @description
 * # authenticationSvc
 * Factory in the flipbookApp.
 */
angular.module('flipbookApp')
  .factory('authenticationSvc', ['$q', '$http', 'globalVariables', '$window',
    function ($q, $http, globalVariables, $window) {
    console.log('authentication factory');
    var userInfo;

    function getUserInfo() {
      return userInfo;
    }

    // function login(email, password) {
    function login(user) {
      console.log('authenticationSvc - login');
      var deferred = $q.defer();

      $http({
        method: 'post',
        url: globalVariables.baseUrl + '/sign-in',
        contentType: false,
        processData: false,
        data: user,
      }).then(function(result) {
        console.log('logged in');
        console.log(result.data.user);
        userInfo = {
          token: result.data.user.token,
          email: result.data.user.email
        };
        $window.sessionStorage.userInfo = JSON.stringify(userInfo);
        deferred.resolve(userInfo);
        console.log(userInfo);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function init() {
      if ($window.sessionStorage.userInfo) {
        userInfo = JSON.parse($window.sessionStorage.userInfo);
      }
    }

    init();

    return {
      login: login,
      getUserInfo: getUserInfo
    };
  }]);
