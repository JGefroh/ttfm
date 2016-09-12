(function() {
  'use strict';
  angular
    .module('ttfm.vendors')
    .controller('VendorsAdminController', ['$scope', 'VendorsService', '$timeout', Controller]);

  function Controller($scope, VendorsService, $timeout) {
    var vm = this;
    function initialize() {
      VendorsService.query().then(function(vendors) {
        vm.vendors = vendors;
      }).finally(function() {
          vm.loading['query-vendors'] = false;
      });
    }

    initialize();
  }
})();
