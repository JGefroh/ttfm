(function() {
  angular
    .module('ttfm.locations')
    .directive('locationForm', Directive);
  function Directive() {
    function Controller() {
      var vm = this;

      function initialize() {
      }

      initialize();
    }

    return {
      restrict: 'A',
      templateUrl: 'locations-form.html',
      controller: [Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        location: '=',
        save: '&'
      }
    };
  }
})();
