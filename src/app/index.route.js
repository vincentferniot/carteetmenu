(function() {
  'use strict';

  angular
    .module('carteetmenu')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        views: {
          '': {
            controller: 'MainController',
            controllerAs: 'main',
            templateUrl: "app/partials/main.html"
          },
          'header': {
            controller: 'HeaderController',
            controllerAs: 'header',
            templateUrl: 'app/partials/header.html' }
        }
      })
      .state('authentication', {
        url: '/authentication',
        views: {
          '': {
            controller: 'AuthenticationController',
            controllerAs: 'authentication',
            templateUrl: "app/components/authentication/authentication.html"
          },
          'header': {
            controller: 'HeaderController',
            controllerAs: 'header',
            templateUrl: 'app/partials/header.html' }
        }
      })
      .state('profile', {
        url: '/profile',
        views: {
          '': {
            controller: 'ProfileController',
            controllerAs: 'profile',
            templateUrl: "app/components/profile/profile.html"
          },
          'header': {
            controller: 'HeaderController',
            controllerAs: 'header',
            templateUrl: 'app/partials/header.html' }
        }
      })
      .state('menus', {
        url: '/menus',
        views: {
          '': {
            controller: 'MenusController',
            controllerAs: 'menus',
            templateUrl: "app/components/menus/menus.html"
          },
          'header': {
            controller: 'HeaderController',
            controllerAs: 'header',
            templateUrl: 'app/partials/header.html' }
        }
      })
      .state('menu', {
        url: '/menu/{id}',
        views: {
          '': {
            controller: 'MenuController',
            controllerAs: 'menu',
            templateUrl: "app/components/menu/menu.html"
          },
          'header': {
            controller: 'HeaderController',
            controllerAs: 'header',
            templateUrl: 'app/partials/header.html' }
        }
      })
      .state('meals', {
        url: '/meals',
        views: {
          '': {
            controller: 'MealsController',
            controllerAs: 'meals',
            templateUrl: "app/components/meals/meals.html"
          },
          'header': {
            controller: 'HeaderController',
            controllerAs: 'header',
            templateUrl: 'app/partials/header.html' }
        }
      });

    $urlRouterProvider.otherwise('/');
  }
})();
