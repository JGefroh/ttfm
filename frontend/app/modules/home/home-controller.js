(function() {
  'use strict';
  angular
    .module('ttfm.home')
    .controller('HomeController', ['$scope', 'LocationsService', 'locations', Controller]);

  function Controller($scope, LocationsService, locations) {
    var vm = this;
  }
})();
