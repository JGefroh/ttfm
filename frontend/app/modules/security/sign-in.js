(function() {
  'use strict';
  angular
    .module('ttfm.security')
    .directive('signIn', Directive);
  function Directive() {
    function Controller($rootScope, $state, SecurityService) {
      var vm = this;
      function initialize() {
      }
      vm.signIn = function() {
        vm.error = false;
        SecurityService.signIn(vm.password).then(function() {
          $state.go('ttfm.markets.admin');
        }).catch(function() {
          vm.error = 'Your password is incorrect.'
        })

      };

      initialize();
    }

    return {
      restrict: 'A',
      templateUrl: 'sign-in.html',
      controller: ['$rootScope', '$state', 'SecurityService', Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
      }
    };
  }
})();
