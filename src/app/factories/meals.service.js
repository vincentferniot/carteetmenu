(function() {
  'use strict';

  angular
    .module('MealsService', [])
    .factory('Meals', MealsService);

  /**@ngInject**/
  function MealsService($stamplay, $q, User) {

    return {
      all: all,
      create: create,
      update: update,
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
          mealCollection
            .populate()
            .equalTo('owner', user.get('_id'))
            .fetch()
            .then(function(){
                def.resolve(mealCollection);
              }, function(){
                def.reject({'error': 'Unable to retrieve meals data.'});
              });

        }, function(response){
          toastr.error(response.error);
        });

      return def.promise;
    }

    /**
     * return a meal providing its id
     */
    function getMealById(id) {
      var def = $q.defer();
      var mealModel = $stamplay.Cobject('meal').Model;

      mealModel
        .fetch(id)
        .then(
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
      var mealModel = $stamplay.Cobject('meal').Model;

      angular.forEach(data, function(value, key) {
        mealModel.set(key, value);
      });

      // save the object
      mealModel
        .save()
        .then(
          function() {
            def.resolve(mealModel);
          }, function(){
            def.reject({'error': 'Unable to create meal.'});
          });

      return def.promise;
    }

    /**
     * UPDATE a meal
     */
    function update(id, data) {
      var def = $q.defer();
      var meal = $stamplay.Cobject('meal').Model;

      meal.fetch(id).then(
        function(){

          meal.set('title', data.title);
          meal.set('desc', data.desc);

          if (data.picture){
            meal.set('picture', data.picture);
          }

          meal
            .save()
            .then(
              function() {
                def.resolve(meal);
              }, function(){
                def.reject({'error': 'Unable to update your meal.'});
              });
        }
      );

      return def.promise;
    }

    /**
     * DESTROY a meal
     */
    function destroy(id) {
      var def = $q.defer();
      var mealModel = $stamplay.Cobject('meal').Model;

      mealModel
        .fetch(id)
        .then(
          function() {
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