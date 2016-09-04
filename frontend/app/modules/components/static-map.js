(function() {
  'use strict';
  angular
    .module('jgefroh.components')
    .directive('staticMap', Directive);
  function Directive() {
    function Controller($sce, config) {
      var vm = this;

      vm.getUrl = function() {
        return $sce.trustAsResourceUrl('https://www.google.com/maps/api/staticmap?key='
                        + encodeURIComponent(config.googleMapsAPIKey)
                        + '&center=' + encodeURIComponent(vm.location)
                        + '&size=' + encodeURIComponent(vm.size)
                        + '&markers=color:red%7C%7C' + encodeURIComponent(vm.location)
                        + '&zoom=16');
      };
    }

    return {
      restrict: 'A',
      template: '<img src="{{ vm.getUrl() }}"></img>',
      replace: true,
      controller: ['$sce', 'config', Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        location: '=',
        size: '@'
      }
    };
  }
})();
