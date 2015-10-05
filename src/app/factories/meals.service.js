(function() {
  'use strict';

  angular
    .module('MealsService', [])
    .factory('Meals', MealsService);

  /**@ngInject**/
  function MealsService($stamplay, $q, $http, User) {

    // return an object with all our functions
    return {
      all: all,
      create: create,
      createPicture: createPicture,
      destroy: destroy,
      getMealById: getMealById
    };

    /**
     * return a collection of meals
     */
    function all() {
      var def = $q.defer();
      var mealCollection = $stamplay.Cobject('meal').Collection;

      User.getCurrent().then(
        function(user){
          mealCollection.populate().equalTo('owner', user.get('_id')).fetch().then(
            function(){
              def.resolve(mealCollection);
            }, function(){
              def.reject({'error': 'Unable to retrieve meals data.'});
            })

        });


      return def.promise;
    }

    /**
     * return a meal providing its id
     */
    function getMealById(id) {
      var def = $q.defer();
      var mealModel = $stamplay.Cobject('meal').Model;

      mealModel.fetch(id).then(
        function(){
          def.resolve(mealModel);
        }, function(){
          def.reject({'error': 'Unable to retrieve meals data.'});
        });

      return def.promise;
    }

    /**
     * ADD a meal
     */
    function create(data) {
      var def = $q.defer();

      // instanticate a new product model from the stamplay js sdk
      var mealModel = $stamplay.Cobject('meal').Model;

      // loop over the fields in data and update the product
      angular.forEach(data, function(value, key) {
        mealModel.set(key, value);
      });

      // save the object
      mealModel.save()
        .then(function() {
          def.resolve(mealModel);
        }, function(){
          def.reject({'error': 'Unable to create meal.'});
        });

      return def.promise;
    }

    /**
     * Create a picture
     */
    function createPicture(file) {
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
     * DESTROY a meal
     */
    function destroy(id) {
      var def = $q.defer();

      // instanticate a new product model from the stamplay js sdk
      var mealModel = $stamplay.Cobject('meal').Model;

      mealModel.fetch(id)
        .then(function() {
          return mealModel.destroy();
        })
        .then(function() {
          // return true that the product was deleted
          def.resolve({ 'success': true });
        });

      return def.promise;
    }
  }
})();