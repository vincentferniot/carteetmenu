(function() {
  'use strict';

  angular
    .module('app.admin.menu', [])
    .controller('AdminMenuController', AdminMenuController);

  /** @ngInject */
  function AdminMenuController(Meals, Menus, $stateParams) {
    var menu = this;

    menu.mealCollection = [];
    menu.availableMeals = [];
    menu.insertedMeals = [];
    menu.title = '';
    menu.id = '';
    menu.templateID = '';
    menu.embedCode = '';
    menu.parts = {};
    menu.parts.data = [];
    menu.parts.model = [];

    menu.update = update;
    menu.addPart = addPart;
    menu.deletePart = deletePart;
    menu.displayMeals = displayMeals;

    Meals.all().then(
      function(mealCollection){
        angular.copy(mealCollection, menu.mealCollection);

        Menus.getMenuById($stateParams.id).then(
          function(menuModel){
            menu.title = menuModel.get('title');
            menu.id = menuModel.get('id');
            menu.parts.data = menuModel.get('parts');
            menu.displayMeals(mealCollection);
            menu.embedCode = '<iframe ' +
              'src="https://carteetmenu.stamplayapp.com/#/menu/'+ menu.id +'" ' +
              'frameborder="0" ' +
              'height="800" ' +
              'width="600" ' +
              'name="'+ menu.title +'"></iframe>';

            menu.templateID = menuModel.get('template')[0];
            //Menus.getMenuTemplate(menuModel.get('template')).then(
            //  function(template){
            //    menu.template = template.instance;
            //  }
            //);
          });
    });
    //[{"title":"Entrées","id":["561626cbf9c21300285c44df","56154d9af9c21300285c426a"]},{"title":"Plats","id":["560d8bcdfe5c006e29d407f9","56162832f9c21300285c44e1","560e5a4bfe5c006e29d409ae"]}]

    /** ui-sortable options **/
    menu.sortableOptions = {
      placeholder: 'meals',
      connectWith: '.sortable',
      cursor: 'move',
      opacity: 0.5,
      stop: function(e, ui){
        //console.log(ui.item.sortable);
        //console.log(ui.item.sortable.model.instance.id);
        //console.log(ui.item.sortable.source);
        //console.log(ui.item.sortable.sourceModel);
        //console.log(ui.item);

        addMealToPart();
      }
    };
    /** ui-sortable meal container options **/
    menu.sortableContainerOptions = {
      placeholder: 'menu-container',
      connectWith: '.sortable-container',
      cursor: 'move',
      opacity: 0.5
    };

    /**
     * Display meals
     * @param mealCollection
     */
    function displayMeals(mealCollection){
      var count = 0;
      console.log(mealCollection);

      angular.forEach(menu.parts.data, function(part){

        var title = !_.isEmpty(part.title) ? part.title : '';
        var meals = [];

        if (_.isArray(part.mealsID) && !_.isUndefined(part.mealsID) && !_.isEmpty(part.mealsID)){

          angular.forEach(part.mealsID, function(id){

            if(mealCollection.get(id)){
              meals.push(mealCollection.get(id));
            }
          });

          //Menus.getMeals({'menuId': $stateParams.id, 'mealsId': meal.id}).then(
          //  function(data){
          //    meals = data;
          //    menu.part.splice(count, 0, {
          //      title: title,
          //      meals: meals
          //    });
          //  }
          //);

          mealCollection.remove(part.mealsID);
        }

        menu.parts.model.splice(count, 1, {
          title: title,
          meals: meals
        });

        count++;
      });

      menu.availableMeals = mealCollection.instance;
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
      var mealCollection = angular.copy(menu.mealCollection);

      menu.parts.model.splice(index, 1);
      delete menu.parts.data[keys[index]];
      //angular.copy(menu.mealCollection, mealCollection);
      //console.log(menu.mealCollection);
      console.log(mealCollection);
      menu.displayMeals(mealCollection);
    }

    /**
     * save menu
     */
    function update(){
      var parts = {};
      var data = [];
      var count = 0;

      angular.forEach(menu.parts.model, function(part){
        var mealsID = [];

        angular.forEach(part.meals, function(meal){
          mealsID.push(meal.get('id'));
        });

        parts[count] = {
          title: part.title,
          mealsID: mealsID
        };

        count++;
      });

      data.parts = parts;
      data.title = menu.title;
      data.template = menu.templateID;

      Menus.update($stateParams.id, data).then(
        function(){
          toastr.success('Your menu has been updated successfully', 'Menu update');
        }
      );
    }

    function addMealToPart(){
      var count = 0;
      angular.forEach(menu.parts.model, function(part){
        //var mealsID = [];
        console.log(menu.parts.data);

        angular.forEach(part.meals, function(meal){
          menu.parts.data[count].mealsID.push(meal.get('id'));
        });


        //parts[count] = {
        //  title: part.title,
        //  mealsID: mealsID
        //};

        count++;
      });
    }

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