(function() {
  'use strict';

  angular
    .module('carteetmenu')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, toastr, $stamplay, User, $rootScope) {
    var main = this;



    main.awesomeThings = [];
    main.classAnimation = '';
    main.creationDate = 1438634678449;
    main.showToastr = showToastr;
    main.user = {};


    //activate();
    //
    //function activate() {
    //  $timeout(function() {
    //    main.classAnimation = 'rubberBand';
    //  }, 4000);
    //}

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      main.classAnimation = '';
    }

    //function getWebDevTec() {
    //  main.awesomeThings = webDevTec.getTec();
    //
    //  angular.forEach(main.awesomeThings, function(awesomeThing) {
    //    awesomeThing.rank = Math.random();
    //  });
    //}
  }
})();
