'use strict';

/**
 * @ngdoc overview
 * @name flipbookApp
 * @description
 * # flipbookApp
 *
 * Main module of the application.
 */
angular
  .module('flipbookApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
            var userInfo = authenticationSvc.getUserInfo();

            if (userInfo) {
              return $q.when(userInfo);
            } else {
              console.log('fuck off');
              return $q.reject({ authenticated: false });
            }
          }]
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
        resolve: {
          auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
            var userInfo = authenticationSvc.getUserInfo();

            if (userInfo) {
              return $q.when(userInfo);
            } else {
              console.log('fuck off');
              return $q.reject({ authenticated: false });
            }
          }]
        }
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact',
        resolve: {
          auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
            var userInfo = authenticationSvc.getUserInfo();

            if (userInfo) {
              return $q.when(userInfo);
            } else {
              console.log('fuck off');
              return $q.reject({ authenticated: false });
            }
          }]
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/registration', {
        templateUrl: 'views/registration.html',
        controller: 'RegistrationCtrl',
        controllerAs: 'registration',
        resolve: {
          auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
            var userInfo = authenticationSvc.getUserInfo();

            if (userInfo) {
              return $q.when(userInfo);
            } else {
              console.log('fuck off');
              return $q.reject({ authenticated: false });
            }
          }]
        }
      })
      .when('/createImage', {
        templateUrl: 'views/createimage.html',
        controller: 'CreateimageCtrl',
        controllerAs: 'createImage',
        resolve: {
          auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
            var userInfo = authenticationSvc.getUserInfo();

            if (userInfo) {
              return $q.when(userInfo);
            } else {
              console.log('fuck off');
              return $q.reject({ authenticated: false });
            }
          }]
        }
      })
      .when('/gallery', {
        templateUrl: 'views/gallery.html',
        controller: 'GalleryCtrl',
        controllerAs: 'galleryCtrl',
        resolve: {
          auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
            var userInfo = authenticationSvc.getUserInfo();

            if (userInfo) {
              return $q.when(userInfo);
            } else {
              return $q.reject({ authenticated: false });
            }
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeSuccess", function(userInfo) {
    });

    $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
      if (eventObj.authenticated === false) {
        $location.path("/login");
      }
    });
  }]);
