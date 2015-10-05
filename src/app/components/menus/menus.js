(function() {
  'use strict';

  angular
    .module('app.menus', [])
    .controller('MenusController', MenusController);

  /** @ngInject */
  function MenusController(Menus) {
    var menus = this;

    menus.create = create;
    menus.destroy = destroy;
    menus.model = {};
    menus.items = {};
    menus.fields = [
      {
        key: 'title',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Menu title',
          placeholder: 'Enter menu title',
          required: true
        }
      }
    ];

    function update(){
      Menus.all().then(function(menuCollection){
        menus.items = menuCollection.instance;
      });
    }

    function create(){
      var menuData = {
        title: menus.model.title
      };

      Menus.create(menuData).then(
        function(menu){
          toastr.success('Your meal <strong>'+ menu.get('title') +'</strong> has been created.');
          update();
          menus.model = {};
        }, function(data){
          toastr.error(data.error);
        });
    }

    function destroy(menu){

      Menus.destroy(menu.id).then(
        function(){
          toastr.success('Your menu '+ menu.title +' has been deleted.');
          update();

        }, function(error){
          toastr.error(error);
        });
    }

    update();
  }
})();