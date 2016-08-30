(function() {
  'use strict';
  angular
    .module('ttfm.locations')
    .controller('LocationsBrowseController', ['LocationsService', 'locations', Controller]);

  function Controller(LocationsService, locations) {
    var vm = this;
    function initialize() {
      if (!locations) {
        LocationsService.query().then(function(locations) {
          vm.locations = locations;
          LocationsService.cache('locations', locations);
        });
      }
      else {
        vm.locations = locations;
      }
    }
    initialize();
  }
})();
