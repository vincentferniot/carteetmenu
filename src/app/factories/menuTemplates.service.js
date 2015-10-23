(function() {
  'use strict';

  angular
    .module('MenuTemplatesService', [])
    .factory('MenuTemplates', MenuTemplatesService);

  /**@ngInject**/
  function MenuTemplatesService($stamplay, $q) {

    // return an object with all our functions
    return {
      all: all
    };

    /**
     * return a collection of menus
     */
    function all() {
      var def = $q.defer();
      var tplCollection = $stamplay.Cobject('template').Collection;

      tplCollection.fetch().then(
        function(){
          def.resolve(tplCollection);
        }, function(){
          def.reject({'error': 'Unable to retrieve templates data.'});
        });

      return def.promise;
    }
  }
})();