(function() {
  'use strict';
  angular
    .module('jgefroh.components')
    .directive('textField', Directive);
  function Directive() {
    function Controller() {
      var vm = this;
    }

    return {
      restrict: 'A',
      template: '<div class="input-field text">' +
                  '<label>{{::vm.label}}</label>' +
                  '<input data-ng-model="vm.ngModel" type="{{vm.type || \'text\'}}" />' +
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
