(function() {
  'use strict';

  angular
    .module('app.admin.meals', [])
    .controller('AdminMealsController', AdminMealsController)
    .controller('AdminMealsModalController', AdminMealsModalController);


  /** @ngInject */
  function AdminMealsController(Meals, $modal, $timeout, $stamplay, $rootScope, Picture) {
    var meals = this;

    meals.items = {};
    meals.collection = {};
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



    function check(){

      var mealData = {
        title: meals.model.formly.title,
        desc: meals.model.formly.desc
      };

      if (typeof meals.model.picture === 'object'){
        Picture.create(meals.model.picture).then(
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


    function update(data){

      if (data){
        var mealModel = meals.collection.get(data.id);
        var picture = $stamplay.Cobject('pictures').Model;
        var mealPicture = mealModel.get('picture');

        picture.fetch(mealPicture[0].id).then(function(){

          console.log(picture);

          $timeout(function(){
            mealModel.instance.picture[0].file = picture.get('file');

          }, 500);


        });

        mealModel.instance.title = data.title;
        mealModel.instance.desc = data.desc;

      } else {
        Meals.all().then(function(data){
          meals.collection = data;
          meals.items = data.instance;
        });
      }
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

    function edit(meal){

      $modal.open({
        //animation: $scope.animationsEnabled,
        templateUrl: 'app/components/admin/meals/editModal.html',
        controller: 'AdminMealsModalController',
        controllerAs: 'editedMeal',
        bindToController: true,
        //size: size,
        resolve: {
          meal: function () {
            return meal;
          }
        }
      });
    }

    $rootScope.$on('adminMeals.update', function(event, args){
      update(args);
    });

    update();
  }

  /** @ngInject */
  function AdminMealsModalController($modalInstance, meal, Meals, $rootScope, Picture) {

    var editedMeal = this;

    editedMeal.models = {
      formly: {
        title: meal.title,
        desc: meal.desc
      },
      picture: undefined
    };

    editedMeal.originalPicture = meal.picture[0].file;

    editedMeal.fields = [
      {
        key: 'title',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Meal title',
          value: 'Enter meal title',
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

    /**
     * save meal
     */
    editedMeal.update = function(){
      var data = [];

      data.id = meal.id;
      data.title = editedMeal.models.formly.title;
      data.desc = editedMeal.models.formly.desc;
      data.picture = {
        //title: ,
        id: meal.picture[0].id,
        file: editedMeal.models.picture
      };

      if (_.isUndefined(data.picture.file)){
        console.log('no update')
        updateMeal(data);
      } else {
        Picture.update(data.picture).then(function(){
          console.log('update')

          updateMeal(data);
        });
      }
    };

    function updateMeal(data){
      Meals.update(meal.id, data).then(
        function(){
          $modalInstance.close();
          $rootScope.$broadcast('adminMeals.update', data);
          toastr.success('Your meal has been updated successfully', 'Meal update');
        }
      );
    }

    editedMeal.cancel = function() {
      $modalInstance.dismiss('cancel');
    };

  }

})();