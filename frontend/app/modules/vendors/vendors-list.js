(function() {
  'use strict';
  angular
    .module('ttfm.vendors')
    .directive('vendorsList', Directive);
  function Directive() {
    function Controller(VendorsService) {
      var vm = this;
      function initialize() {
        VendorsService.query({market_id: vm.market.id}).then(function(vendors) {
          vm.vendors = vendors;
        });
      }
      initialize();
    }

    return {
      restrict: 'A',
      templateUrl: 'vendors-list.html',
      replace: true,
      controller: ['VendorsService', Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        market: '='
      }
    };
  }
})();
