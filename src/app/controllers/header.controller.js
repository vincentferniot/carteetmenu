(function() {
  'use strict';

  angular
    .module('carteetmenu')
    .controller('HeaderController', HeaderController);

  /** @ngInject */
  function HeaderController($location, $state, User) {
    var header = this;

    header.isActive = isActive;
    header.logout = logout;

    function isActive(viewLocation){
      return viewLocation === $location.path();
    }

    function logout(){
      User.logout();
      $state.go('home');
    }
  }
})();
