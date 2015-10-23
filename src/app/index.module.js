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
      'ui.bootstrap',
      'ui.router',
      'ui.sortable',
      'formly',
      'formlyBootstrap',
      'app.authentication',
      'app.menu',
      'app.admin.profile',
      'app.admin.menu',
      'app.admin.menus',
      'app.admin.meals',
      'MenusService',
      'MealsService',
      'PictureService',
      'UserService',
      'MenuTemplatesService'
    ]);

})();
