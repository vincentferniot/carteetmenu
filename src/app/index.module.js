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
      'app.admin.profile',
      'app.admin.menu',
      'app.admin.menus',
      'app.admin.meals',
      'MenusService',
      'MealsService',
      'UserService'
    ]);

})();
