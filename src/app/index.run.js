(function() {
  'use strict';

  Stamplay.init('carteetmenu', {populate_owner: true});

  angular
    .module('carteetmenu')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, User) {

    $log.debug('runBlock end');
    $rootScope.currentUser = {};


    User.getCurrent()
      .then(function(data) {
        if (data.get('_id')) {
          $rootScope.currentUser.id    = data.get('_id');
          $rootScope.currentUser.name  = data.get('displayName');
          //$rootScope.currentUser.image = data.get('profileImg');



        } else {
          // clear the current user just to be sure
          $rootScope.currentUser = {};
          $state.go('home');
        }
      });

  }

})();
