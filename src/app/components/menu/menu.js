(function() {
  'use strict';

  angular
    .module('app.menu', [])
    .controller('MenuController', MenuController);

  /** @ngInject */
  function MenuController(Menus, $stateParams) {
    var menu = this;

    menu.meals = [];
    menu.title = '';
    menu.insertedMeals = [];

    Menus.getMenuById($stateParams.id).then(

      function(menuModel){

        menu.title = menuModel.get('title');
        menu.id = menuModel.get('id');
        menu.parts = menuModel.get('parts');;

        angular.forEach(menu.parts, function(part){

          if (_.isArray(part.mealsID) && !_.isUndefined(part.mealsID)){
            Menus.getMeals({'menuID': $stateParams.id, 'mealsID': part.mealsID}).then(
              function(meals){
                menu.insertedMeals.push(meals);
              }
            );
          }
        });

      });
  }
})();