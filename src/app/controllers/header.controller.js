(function() {
  'use strict';

  angular
    .module('carteetmenu')
    .controller('HeaderController', HeaderController);

  /** @ngInject */
  function HeaderController($location, User) {
    var header = this;

    header.isActive = isActive;
    header.logout = logout;

    function isActive(viewLocation){
      return viewLocation === $location.path();
    }

    function logout(){
      User.logout();
    }
  }
})();
