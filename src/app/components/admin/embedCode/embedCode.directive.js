(function() {
  'use strict';

  angular
    .module('carteetmenu')
    .directive('embedCode', embedCode);

  /** @ngInject */
  function embedCode() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/admin/embedCode/embedCode.html',
      transclude: true,
      scope: {
        template: '=template',
        menuID: '=menuId'
      },
      //controller: EmbedCodeController,
      //controllerAs: 'embedCode',
      link: function(scope, element, attrs){
console.log(attrs.menuId);

        scope.$watch(attrs.menuId, function(value){
          console.log(value);
          scope.html = '<iframe src="https://carteetmenu.stamplayapp.com/#/menu/'+ attrs.menuId +'" frameborder="0"></iframe>';

        });
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
