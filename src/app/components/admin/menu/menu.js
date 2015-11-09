(function() {
  'use strict';

  angular
    .module('app.admin.menu', [])
    .controller('AdminMenuController', AdminMenuController);

  /** @ngInject */
  function AdminMenuController(Meals, Menus, $stateParams) {
    var menu = this;

    menu.meals = [];
    menu.embedCode = '';
    menu.id = '';
    menu.mealCollection = [];
    menu.parts = {};
    menu.parts.data = [];
    menu.parts.model = [];
    menu.templateID = '';
    menu.title = '';

    menu.update = update;
    menu.addPart = addPart;
    menu.deletePart = deletePart;
    menu.populate = populate;

    Meals.all().then(
      function(mealCollection){
        angular.copy(mealCollection, menu.mealCollection);

        Menus
          .getMenuById($stateParams.id)
          .then(
            function(menuModel){
              menu.title = menuModel.get('title');
              menu.id = menuModel.get('id');
              menu.parts.data = menuModel.get('parts');
              menu.embedCode = '<iframe ' +
                'src="https://carteetmenu.stamplayapp.com/#/menu/'+ menu.id +'" ' +
                'frameborder="0" ' +
                'height="800" ' +
                'width="600" ' +
                'name="'+ menu.title +'"></iframe>';

              menu.templateID = menuModel.get('template')[0];
              menu.meals = mealCollection;

              menu.populate();

            });
    });

    /** ui-sortable options **/
    menu.sortableOptions = {
      placeholder: 'meals',
      connectWith: '.sortable',
      cursor: 'move',
      opacity: 0.5
    };

    /** ui-sortable meal container options **/
    menu.sortableContainerOptions = {
      placeholder: 'menu-container',
      connectWith: '.sortable-container',
      cursor: 'move',
      opacity: 0.5
    };

    /**
     * Populate view with meals
     */
    function populate(){
      angular.forEach(menu.parts.data, function(part){
        var meals = [];

        if (_.isArray(part.mealsID) &&
          !_.isUndefined(part.mealsID) &&
          !_.isEmpty(part.mealsID)){

          angular.forEach(part.mealsID, function(id){
            meals.push(menu.mealCollection.get(id));
          });

          menu.mealCollection.remove(part.mealsID);
        }

        menu.meals = getFormattedMeals(menu.mealCollection.instance);

        menu.parts.model.push({
          title: !_.isEmpty(part.title) ? part.title : '',
          meals: getFormattedMeals(meals)
        });
      });
    }

    /**
     * Format meals data
     * @param meals
     * @returns {Array|*|{annotation}}
     */
    function getFormattedMeals(meals){
      return meals.map(function(meal) {
        return {
          id: meal.get('id'),
          title: meal.get('title'),
          picture: meal.get('picture')[0].file
        };
      })
    }

    /**
     * add part to the menu
     */
    function addPart(){
      var newPart = {
        title: '',
        meals: []
      };
      var index = 0;

      if (!_.isUndefined(menu.parts.data)){
        index = _.size(menu.parts.data);
      } else {
        menu.parts.data = [];
      }

      menu.parts.model.push(newPart);
      menu.parts.data[index] = newPart;
    }

    /**
     * delete part from the menu
     * @param index
     */
    function deletePart(index){
      var keys = _.keys(menu.parts.data);
      var part = menu.parts.model.splice(index, 1);

      angular.forEach(part[0].meals, function(meal){
        menu.meals.push(meal);
      });

      delete menu.parts.data[keys[index]];
    }

    /**
     * save menu
     */
    function update(){
      var data = {
        parts: menu.parts.model.map(function(part){
          return {
            title: part.title,
            mealsID: part.meals.map(function(meal){
              return meal.id
            })
          }
        }),
        title: menu.title,
        template: menu.templateID
      };

      Menus.update($stateParams.id, data).then(
        function(){
          toastr.success('Your menu has been updated successfully', 'Menu update');
        }
      );
    }
  }
})();