(function() {
  'use strict';

  angular
    .module('carteetmenu')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastr) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastr.options = {
      timeOut: 2000,
      closeButton: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    };
  }

})();
