(function () {
  'use strict';

  //angular
  //  .module('app.admin.meals', [])
  //  .controller('AdminMealsModalController', AdminMealsModalController);

  /** @ngInject */
  function AdminMealsModalController($scope, $modalInstance) {

    //$scope.items = items;
    //$scope.selected = {
    //  item: $scope.items[0]
    //};
    //
    //$scope.ok = function () {
    //  $modalInstance.close($scope.selected.item);
    //};

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  }
})();