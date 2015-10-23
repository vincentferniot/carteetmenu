(function() {
  'use strict';

  angular
    .module('app.admin.meals', [])
    .controller('AdminMealsController', AdminMealsController)
    .controller('AdminMealsModalController', AdminMealsModalController);


  /** @ngInject */
  function AdminMealsController(Meals, $modal, $timeout, $stamplay, $scope, $q, $rootScope, Picture) {
    var meals = this;

    meals.items = {};
    meals.collection = {};
    meals.create = create;
    meals.createPicture = createPicture;
    meals.destroy = destroy;
    meals.openModal = openModal;
    meals.render = render;
    meals.resetPictureModel = resetPictureModel;
    meals.update = update;
    meals.models = {};
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


    /**
     * Tests whether a picture was added to the meal
     */
    function create(){
      var data = {
        title: meals.models.formly.title,
        desc: meals.models.formly.desc
      };
      /**
       * test if the picture value is an object
       * which means it has a picture included
       */
      if (typeof meals.models.picture === 'object'){
        createPicture(meals.models.picture).then(
          function(response){
            data.picture = response.picture;
            createMeal(data);
          }
        );
      } else {
        createMeal(data);
      }
    }

    /**
     * Create meal
     * @param data
     */
    function createMeal(data){

      Meals.create(data).then(
        function(meal){
          toastr.success('Your meal <strong>'+ meal.get('title') +'</strong> has been created.');
          render();
          resetForm();
        }, function(data){
          toastr.error(data.error);
        });
    }

    /**
     * Create picture
     * @param file
     * @returns {*}
     */
    function createPicture(file){
      var def = $q.defer();

      Picture.create(file).then(
        function(response){
          def.resolve(response);
        });

      return def.promise;
    }

    /**
     * Reset form data
     */
    function resetForm(){
      meals.models.formly = {};
      meals.models.picture = undefined;
    }

    /**
     * Render meal collection
     */
    function render(){
      Meals.all().then(
        function(data){
          meals.collection = data;
          meals.items = data.instance;
        });

      //if (data){
      //  var mealModel = meals.collection.get(data.id);
      //  var mealPicture = mealModel.get('picture');
      //
      //  if (!_.isUndefined(mealPicture)){
      //    var picture = $stamplay.Cobject('pictures').Model;
      //
      //    picture.fetch(mealPicture[0].id).then(
      //      function(){
      //        console.log(picture);
      //        $timeout(function(){
      //          mealModel.instance.picture[0].file = picture.get('file');
      //        }, 500);
      //      });
      //  }
      //
      //  mealModel.instance.title = data.title;
      //  mealModel.instance.desc = data.desc;
      //
      //} else {
      //  Meals.all().then(
      //    function(data){
      //      meals.collection = data;
      //      meals.items = data.instance;
      //    });
      //}
    }

    /**
     * Update meal
     * @param data
     */
    function update(data){

      Meals.update(data.id, data).then(
        function(){
          toastr.success('Your meal '+ data.title +' has been updated.');
          $timeout(function(){
            render();
          }, 500);
        }, function(error){
          toastr.error(error);
        });
    }

    /**
     * Destroy meal
     * @param data
     */
    function destroy(data){

      Meals.destroy(data.id).then(
        function(){
          toastr.success('Your meal '+ data.title +' has been deleted.');
          render();

        }, function(error){
          toastr.error(error);
        });
    }

    /**
     * Reset form picture model
     */
    function resetPictureModel(){
      meals.models.picture = undefined;
    }

    /**
     * Open modal with meal data
     * @param meal
     */
    function openModal(meal){

      $modal.open({
        templateUrl: 'app/components/admin/meals/updateMealModal.html',
        controller: 'AdminMealsModalController',
        controllerAs: 'updateMealModal',
        bindToController: true,
        resolve: {
          meals: function () {
            return meals;
          },
          meal: function () {
            return meal;
          }
        }
      });
    }

    render();
  }



  /** @ngInject */
  function AdminMealsModalController($modalInstance, meal, meals, Picture) {
    var updateMealModal = this;

    updateMealModal.update = update;
    updateMealModal.meal = meal;
    updateMealModal.models = {
      formly: {
        title: meal.title,
        desc: meal.desc
      },
      picture: undefined
    };
    updateMealModal.fields = [
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
     * Update meal
     */
    function update(){
      var data = {};

      data.id = meal.id;
      data.title = updateMealModal.models.formly.title;
      data.desc = updateMealModal.models.formly.desc;

      /**
       * Test if a picture has been added to the meal
       */
      if (_.isUndefined(updateMealModal.models.picture)) {
        meals.update(data);
      } else {
        /**
         * Test if their was a picture attached to the meal
         */
        if (_.isUndefined(meal.picture)){
          /**
           * if meal.picture is undefined
           * we create the picture and then update meal
           */
          meals.createPicture(updateMealModal.models.picture).then(
            function(response){
              data.picture = response.picture;
              meals.update(data);
            }
          );
        } else {
          /**
           * if meal.picture is defined
           * we update the picture and then update meal
           */
          var picture = {
            id: meal.picture[0].id,
            file: updateMealModal.models.picture
          };

          Picture.update(picture).then(
            function(){
              meals.update(data);
            }
          );
        }
      }
      /**
       * Close modal
       */
      $modalInstance.close();
    }

    /**
     * Cancel update
     */
    updateMealModal.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  }

})();