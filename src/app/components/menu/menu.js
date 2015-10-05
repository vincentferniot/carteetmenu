(function() {
  'use strict';

  angular
    .module('app.menu', [])
    .controller('MenuController', MenuController);

  /** @ngInject */
  function MenuController(Meals, Menus, $stateParams) {
    var menu = this;

    menu.availableMeals = [];
    menu.insertedMeals = [];
    menu.title = '';


    Meals.all().then(
      function(mealCollection){

        Menus.getMenuById($stateParams.id).then(

          function(menuModel){

            var mealsId = menuModel.get('meals');

            menu.title = menuModel.get('title');

            if (mealsId){
              Menus.getMeals({'menuId': $stateParams.id, 'mealsId': mealsId}).then(
                function(meals){

                  mealCollection.remove(mealsId);
                  menu.insertedMeals = meals;
                  menu.availableMeals = mealCollection.instance;
                }
              );
            } else {
              menu.availableMeals = mealCollection.instance;
            }
          });
    });


    /** ui-sortable options **/
    menu.sortableOptions = {
      placeholder: 'meals',
      connectWith: '.sortable',
      cursor: 'move',
      opacity: 0.5
      //stop: function(e, ui){
      //  console.log(menu.insertedMeals);
      //  //console.log(ui.item.sortable.sourceModel[0].instance._id);
      //}
    };
    //menu.sortableOptions = {
    //  dropOnEmpty: true,
    //  placeholder: 'meals',
    //  connectWith: '.sortable',
    //  cursor: 'move',
    //  opacity: 0.5,
    //  stop: function(e, ui){
    //    console.log(menu.insertedMeals);
    //    //console.log(ui.item.sortable.sourceModel[0].instance._id);
    //  }
    //};

    ///** ui-sortable options **/
    //menu.menuOptions = {
    //  connectWith: '.meals-container',
    //  stop: function(e, ui){
    //    console.log(menu.insertedMeals);
    //    //console.log(ui.item.sortable.sourceModel[0].instance._id);
    //  }
    //};







    //$scope.draggableOptions = {
    //  connectWith: ".connected-drop-target-sortable",
    //  stop: function (e, ui) {
    //    // if the element is removed from the first container
    //    if (ui.item.sortable.source.hasClass('draggable-element-container') &&
    //      ui.item.sortable.droptarget &&
    //      ui.item.sortable.droptarget != ui.item.sortable.source &&
    //      ui.item.sortable.droptarget.hasClass('connected-drop-target-sortable')) {
    //      // restore the removed item
    //      ui.item.sortable.sourceModel.push(ui.item.sortable.model);
    //    }
    //  }
    //};

  }
})();