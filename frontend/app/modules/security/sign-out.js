(function() {
  'use strict';
  angular
    .module('ttfm.security')
    .directive('signOut', Directive);
  function Directive() {
    function Controller(SecurityService) {
      var vm = this;
      vm.signOut = function() {
        SecurityService.signOut();
      }

    }

    return {
      restrict: 'A',
      template: '<button data-ng-hide="!$root.adminCode" data-ng-click="vm.signOut()" class="cta danger small">Sign Out</button>',
      replace: true,
      controller: ['SecurityService', Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
      }
    };
  }
})();
