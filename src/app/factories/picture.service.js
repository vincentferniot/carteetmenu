(function() {
  'use strict';

  angular
    .module('PictureService', [])
    .factory('Picture', PictureService);

  /**@ngInject**/
  function PictureService($stamplay, $q, $http) {

    // return an object with all our functions
    return {
      create: create,
      update: update,
      destroy: destroy
    };

    /**
     * Create a picture
     */
    function create(file) {
      var def = $q.defer();

      // create a new formdata
      var fd = new FormData();
      fd.append('file', file);

      // process the upload
      $http({
        method: 'POST',
        url: 'https://carteetmenu.stamplayapp.com/api/cobject/v1/pictures',
        data: fd,
        headers: { 'Content-Type': undefined },
        file: file
      }).then(
        function(response) {
          // push the given id into the pictureIDs array
          def.resolve({ picture: response.data.id });
        });

      return def.promise;
    }

    /**
     * UPDATE a picture
     */
    function update(data) {
      var def = $q.defer();
      var fd = new FormData();

      fd.append('file', data.file);

      $http({
        method: 'PUT',
        url: 'https://carteetmenu.stamplayapp.com/api/cobject/v1/pictures/' + data.id,
        data: fd,
        headers: { 'Content-Type': undefined },
        file: data.file
      }).then(
        function(response) {
          // push the given id into the pictureIDs array
          def.resolve({ picture: response.data.id });
        });

      return def.promise;
    }

    /**
     * DESTROY a picture
     */
    function destroy(id) {
      var def = $q.defer();
      var picture = $stamplay.Cobject('picture').Model;

      picture.fetch(id)
        .then(function() {
          return picture.destroy();
        })
        .then(function() {
          def.resolve({ 'success': true });
        });

      return def.promise;
    }
  }
})();