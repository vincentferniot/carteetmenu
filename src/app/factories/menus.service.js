(function() {
  'use strict';

  angular
    .module('MenusService', [])
    .factory('Menus', MenusService);

  /**@ngInject**/
  function MenusService($stamplay, $q, User, $rootScope) {

    // return an object with all our functions
    return {
      all: all,
      getMenuById: getMenuById,
      getMenuTemplate: getMenuTemplate,
      getMeals: getMeals,
      create: create,
      update: update,
      destroy: destroy
    };

    /**
     * return a collection of menus
     */
    function all() {
      var def = $q.defer();
      var menuCollection = $stamplay.Cobject('menu').Collection;

      User.getCurrent().then(
        function(user){
          menuCollection
            .equalTo('owner', user.get('id'))
            .fetch()
            .then(
              function(){
                def.resolve(menuCollection);
              }, function(){
                def.reject({'error': 'Unable to retrieve menus data.'});
              });
        });

      return def.promise;
    }

    /** return a menu providing its id **/
    function getMenuById(id){
      var def = $q.defer();
      var menu = $stamplay.Cobject('menu').Model;

      menu
        .fetch(id)
        .then(
          function(){
            def.resolve(menu);
          }, function(){
            def.reject({'error': 'Unable to retrieve menu data.'});
          }
      );

      return def.promise;
    }

    /** return the menu template **/
    function getMenuTemplate(templateID){
      var def = $q.defer();
      var template = $stamplay.Cobject('template').Model;

      template
        .fetch(templateID)
        .then(
          function(){
            def.resolve(template);
          }, function(){
            def.reject({'error': 'Unable to retrieve template data.'});
          }
      );

      return def.promise;
    }

    /** retrieve meals list from a menu **/
    function getMeals(data){
      var def = $q.defer();
      var mealCollection = $stamplay.Cobject('meal').Collection;
      var meals = [];

      mealCollection.populate().fetch().then(
        function(){
          angular.forEach(data.mealsID, function(id) {
            var meal = mealCollection.get(id);

            /** test if the meal reference hasn't been deleted
             *  if so it updates the list with the new value(s)
             * **/
            if (meal !== undefined){
              meals.push(meal);
            } else {
              data.mealsID = _.filter(data.mealsID, function(value){
                return value !== id;
              });

              updateMealReference(data);
            }

            def.resolve(meals);
          });
        });

      return def.promise;
    }


    /** update meals ID reference in menu **/
    function updateMealReference(data){
      var menuModel = $stamplay.Cobject('menu').Model;

      menuModel.fetch(data.menuID).then(
        function(){

          menuModel.set('meals', data.mealsID);
          menuModel.save();
        }
      );
    }

    /**
     * ADD a menu
     */
    function create(data) {
      var def = $q.defer();

      // instanticate a new product model from the stamplay js sdk
      var menu = $stamplay.Cobject('menu').Model;

      // loop over the fields in data and update the product
      angular.forEach(data, function(value, key) {
        menu.set(key, value);
      });

      // save the object
      menu.save()
        .then(function() {
          def.resolve(menu);
        }, function(){
          def.reject({'error': 'Unable to create menu.'});
        });

      return def.promise;
    }

    /**
     * UPDATE a menu
     */
    function update(id, data) {
      var def = $q.defer();

      // instanticate a new product model from the stamplay js sdk
      var menu = $stamplay.Cobject('menu').Model;

      menu.fetch(id).then(
        function(){

          angular.forEach(data, function(value, key) {
            menu.set(key, value);
          });

          menu.save()
            .then(function() {
              def.resolve(menu);
            }, function(){
              def.reject({'error': 'Unable to update menu.'});
            });
        }
      );

      return def.promise;
    }


    /**
     * DESTROY a menu
     */
    function destroy(id) {
      var def = $q.defer();

      // instanticate a new product model from the stamplay js sdk
      var menu = $stamplay.Cobject('menu').Model;

      menu.fetch(id)
        .then(function() {
          return menu.destroy();
        })
        .then(function() {
          // return true that the product was deleted
          def.resolve({ 'success': true });
        });

      return def.promise;
    }
  }
})();