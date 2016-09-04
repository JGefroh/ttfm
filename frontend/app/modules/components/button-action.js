(function() {
  'use strict';
  angular
    .module('jgefroh.components')
    .directive('buttonAction', Directive);
  function Directive() {
    function Controller($q) {
      var vm = this;
      vm.onClick = function() {
        if (vm.buttonAction) {
          vm.loading = true;
          $q.when(vm.buttonAction()).finally(function() {
            vm.loading = false;
          });
        }
      };
    }

    return {
      restrict: 'A',
      replace: true,
      controller: ['$q', Controller],
      controllerAs: 'vm',
      bindToController: true,
      transclude: true,
      template: '<button data-ng-click="vm.onClick()"><span data-ng-show="vm.loading" class="fa fa-fw fa-spin fa-spinner"></span><span data-ng-show="!vm.loading" data-ng-transclude></span></button>',
      scope: {
        buttonAction: '&'
      }
    };
  }
})();
