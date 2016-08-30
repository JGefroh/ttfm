(function() {
  'use strict';
  angular
    .module('ttfm.locations')
    .controller('LocationsSaveController', ['$state', 'LocationsService', 'location', Controller]);

  function Controller($state, LocationsService, location) {
    var vm = this;
    function initialize() {
      vm.location = location;
    }

    vm.save = function() {
      if (vm.location.id) {
        update(vm.location);
      }
      else {
        create(vm.location);
      }
    }

    function update(location) {
      LocationsService.update(location).then(function(updated) {
        $state.go('ttfm.locations.show', {id: updated.id});
      });
    }

    function create(location) {
      LocationsService.save(location).then(function(created) {
        $state.go('ttfm.locations.show', {id: created.id});
      });
    }

    initialize();
  }
})();
