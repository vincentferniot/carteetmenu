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


          // if it's not an admin page
          //if(stateCurrentName.indexOf('admin') < 0 && stateCurrentName.indexOf('menu') !== 0){
          //  $state.go('admin.menus');
          //}
        } else {
          // clear the current user just to be sure
          $rootScope.currentUser = {};

          //if (window.location.pathname !== ''){
          //  window.location.pathname = '';
          //}


          //if(stateCurrentName.indexOf('menu') !== 0){
          //  $state.go('home');
          //}
        }
      });
  }
})();
