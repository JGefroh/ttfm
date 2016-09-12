(function() {
  'use strict';
  angular
    .module('jgefroh.components')
    .directive('textArea', Directive);
  function Directive() {
    function Controller() {
      var vm = this;
    }

    return {
      restrict: 'A',
      template: '<div class="input-field textarea">' +
                  '<label>{{::vm.label}}</label>' +
                  '<textarea data-ng-model="vm.ngModel"/>' +
                  '<div data-ng-transclude></div>' +
                '</div>',
      replace: true,
      transclude: true,
      controller: [Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        label: '@',
        ngModel: '=',
        type: '@'
      }
    };
  }
})();
