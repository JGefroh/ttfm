(function() {
  'use strict';
  angular
    .module('ttfm.markets')
    .directive('marketsForm', Directive);
  function Directive() {
    function Controller() {
      var vm = this;

      vm.toggleDay = function(day) {
        var index = vm.market.days_of_week_as_array.indexOf(day);
        if (index === -1) {
          vm.market.days_of_week_as_array.push(day);
        }
        else {
          vm.market.days_of_week_as_array.splice(index, 1);
        }
      }

      vm.isDaySelected = function(day) {
        if (vm.market.days_of_week_as_array) {
          return vm.market.days_of_week_as_array.indexOf(day) !== -1;
        }
        else {
          return false;
        }
      }
    }

    return {
      restrict: 'A',
      templateUrl: 'markets-form.html',
      replace: true,
      controller: [Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        market: '=',
        save: '&'
      }
    };
  }
})();
