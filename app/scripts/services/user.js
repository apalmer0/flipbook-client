'use strict';

/**
 * @ngdoc service
 * @name flipbookApp.User
 * @description
 * # User
 * Factory in the flipbookApp.
 */
angular.module('flipbookApp')
  .factory('User', function UserFactory() {
    // Service logic
    // ...
    var user = {
      isLoggedIn: false,
      token: ''
    };

    // var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return user;
      }
    };
  });
