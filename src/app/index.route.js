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
      .state('admin', {
        abstract: true,
        url: '/admin',
        views: {
          '': {
            templateUrl: "app/components/admin/admin.html"
          },
          'header': {
            controller: 'HeaderController',
            controllerAs: 'header',
            templateUrl: 'app/partials/header.html' }
        }
      })
      .state('admin.profile', {
        url: '/profile',
        views: {
          '': {
            controller: 'AdminProfileController',
            controllerAs: 'profile',
            templateUrl: "app/components/admin/profile/profile.html"
          },
          'header': {
            controller: 'HeaderController',
            controllerAs: 'header',
            templateUrl: 'app/partials/header.html' }
        }
      })
      .state('admin.menus', {
        url: '/menus',
        views: {
          '': {
            controller: 'AdminMenusController',
            controllerAs: 'menus',
            templateUrl: "app/components/admin/menus/menus.html"
          },
          'header': {
            controller: 'HeaderController',
            controllerAs: 'header',
            templateUrl: 'app/partials/header.html' }
        }
      })
      .state('admin.menu', {
        url: '/menu/{id}',
        views: {
          '': {
            controller: 'AdminMenuController',
            controllerAs: 'menu',
            templateUrl: "app/components/admin/menu/menu.html"
          },
          'header': {
            controller: 'HeaderController',
            controllerAs: 'header',
            templateUrl: 'app/partials/header.html' }
        }
      })
      .state('admin.meals', {
        url: '/meals',
        views: {
          '': {
            controller: 'AdminMealsController',
            controllerAs: 'meals',
            templateUrl: "app/components/admin/meals/meals.html"
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
