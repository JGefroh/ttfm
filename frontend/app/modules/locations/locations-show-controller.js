(function() {
  'use strict';
  angular
    .module('ttfm.locations')
    .controller('LocationsShowController', ['$state', 'LocationsService', 'location', Controller]);

  function Controller($state, LocationsService, location) {
    var vm = this;
    function initialize() {
      vm.location = location;
    }

    initialize();
  }
})();
