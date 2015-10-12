(function() {
  'use strict';

  angular
    .module('carteetmenu')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var main = this;

    main.user = {};

  }
})();
