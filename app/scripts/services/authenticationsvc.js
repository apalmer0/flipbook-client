'use strict';

/**
 * @ngdoc service
 * @name flipbookApp.authenticationSvc
 * @description
 * # authenticationSvc
 * Factory in the flipbookApp.
 */
angular.module('flipbookApp')
  .factory('authenticationSvc', ['$q', '$http', 'globalVariables', '$window', '$location',
    function ($q, $http, globalVariables, $window, $location) {
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
          id: result.data.user._id,
          token: result.data.user.token,
          email: result.data.user.email
        };
        // save user data into session storage - ensures user doesn't have to
        // log in every time they refresh the page.
        $window.sessionStorage.userInfo = JSON.stringify(userInfo);
        deferred.resolve(userInfo);
        console.log(userInfo);
        // after logging in, redirect to homepage.
        $location.path('/');
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

    function signUp(user) {
      console.log('signup');
      console.log(user);
      $http({
        method: 'post',
        url: globalVariables.baseUrl + '/sign-up',
        contentType: false,
        processData: false,
        data: user,
      }).success(function(data){
        console.log('user signed up.');
        console.log(data);
        // after signing up, run the login function passing in the collected user credentials
        // so the user doesn't have to sign up and then log in.
        login(user);
      });
    }

    function logout() {
      var deferred = $q.defer();

      $http({
        method: "DELETE",
        url: globalVariables.baseUrl + '/sign-out/' + userInfo.id,
        headers: {
          Authorization: 'Token token=' + userInfo.token,
        },
      }).then(function(result) {
        console.log('signed out booyah');
        $window.sessionStorage.userInfo = null;
        userInfo = null;
        deferred.resolve(result);
        $location.path('/login');
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }


    return {
      getUserInfo: getUserInfo,
      signUp: signUp,
      login: login,
      logout: logout
    };
  }]);
