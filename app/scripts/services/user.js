'use strict';

/**
 * @ngdoc service
 * @name flipbookApp.User
 * @description
 * user factory for storing whether or not the user is logged in, which will be toggled
 * accordingly, and the user's token, which will be used for various authenticated actions.
 */
angular.module('flipbookApp')
  .factory('User', function UserFactory() {
    // Service logic
    // ...
    var user = {
      isLoggedIn: false,
      token: ''
    };

    // Public API here
    return {
      someMethod: function () {
        return user;
      }
    };
  });
