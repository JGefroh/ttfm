(function() {
  'use strict';
  angular
    .module('ttfm.market-vendors')
    .directive('marketVendorsList', Directive);
  function Directive() {
    function Controller(MarketVendorsService) {
      var vm = this;
      function initialize() {
        MarketVendorsService.query({market_id: vm.market.id}).then(function(marketVendors) {
          vm.marketVendors = marketVendors;
          console.info("WHAT");
        });
        console.info("WHAT");
        
      }
      initialize();
    }

    return {
      restrict: 'A',
      templateUrl: 'market-vendors-list.html',
      replace: true,
      controller: ['MarketVendorsService', Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        market: '='
      }
    };
  }
})();
