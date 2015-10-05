(function() {
  'use strict';

  angular
    .module('carteetmenu', [
      'ngStamplay',
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ngResource',
      'ngFileUpload',
      'ui.router',
      'ui.bootstrap',
      'ui.sortable',
      'formly',
      'formlyBootstrap',
      'app.authentication',
      'app.profile',
      'app.menu',
      'app.menus',
      'app.meals',
      'MenusService',
      'MealsService',
      'UserService'
    ]);

})();
