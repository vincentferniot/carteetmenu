(function() {
  'use strict';

  angular
    .module('carteetmenu')
    .directive('menuTemplates', menuTemplates);

  /** @ngInject */
  function menuTemplates(MenuTemplates) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/menuTemplates/menuTemplates.html',
      scope: {
        selected: '=selected'
      },
      link: function(scope, element, attrs){

        scope.templates = {};

        MenuTemplates.all().then(
          function(tpl){
            scope.templates = tpl.instance;
          }
        );

        scope.updateSelected = function(id){
            scope.selected = id;
        }
      }
    };

    return directive;

    ///** @ngInject */
    //function link() { };
    //
    //
    ///** @ngInject */
    //function EmbedCodeController() {
    //  var embedCode = this;
    //
    //  embedCode.html = '<iframe src="https://carteetmenu.stamplayapp.com/#/menu/" frameborder="0"></iframe>';
    //
    //
    //
    //
    //  // "vm.creation" is avaible by directive option "bindToController: true"
    //  //vm.relativeDate = moment(vm.creationDate).fromNow();
    //}
  }

})();
