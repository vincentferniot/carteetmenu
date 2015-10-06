(function() {
  'use strict';

  angular
    .module('app.admin.meals', [])
    .controller('AdminMealsController', AdminMealsController);

  /** @ngInject */
  function AdminMealsController(Meals) {
    var meals = this;

    meals.items = {};
    meals.check = check;
    meals.destroy = destroy;
    meals.edit = edit;
    meals.resetPictureModel = resetPictureModel;
    meals.model = {};
    meals.fields = [
      {
        key: 'title',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Meal title',
          placeholder: 'Enter meal title',
          required: true
        }
      },
      {
        key: 'desc',
        type: 'textarea',
        templateOptions: {
          label: 'Meal description',
          placeholder: 'Enter meal description'
        }
      }
    ];


    function update(){
      Meals.all().then(function(data){
        meals.items = data.instance;
      });
    }

    function check(){

      var mealData = {
        title: meals.model.formly.title,
        desc: meals.model.formly.desc
      };

      if (typeof meals.model.picture === 'object'){
        Meals.createPicture(meals.model.picture).then(
          function(data){
            mealData.picture = data.picture;
            mealData.title = meals.model.formly.title;
            mealData.desc = meals.model.formly.desc;

            create(mealData);
          });
      } else {
        create(mealData);
      }
    }

    function create(data){

      Meals.create(data).then(
        function(meal){
          toastr.success('Your meal <strong>'+ meal.get('title') +'</strong> has been created.');
          update();
          meals.model.formly = {};
          meals.model.picture = undefined;
        }, function(data){
          toastr.error(data.error);
        });
    }

    function edit(id){

      // todo: create edit function
    }

    function destroy(data){

      Meals.destroy(data.id).then(
        function(){
          toastr.success('Your meal '+ data.title +' has been deleted.');
          update();

        }, function(error){
          toastr.error(error);
        });
    }

    function resetPictureModel(){
      meals.model.picture = undefined;
    }

    update();
  }
})();