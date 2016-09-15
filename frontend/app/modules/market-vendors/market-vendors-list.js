(function() {
  'use strict';
  angular
    .module('ttfm.market-vendors')
    .directive('marketVendorsList', Directive);
  function Directive() {
    function Controller($scope, MarketVendorsService) {
      var vm = this;
      function initialize() {
        MarketVendorsService.query({market_id: vm.market.id}).then(function(marketVendors) {
          vm.marketVendors = marketVendors;
        });
      }
      initialize();
    }

    return {
      restrict: 'A',
      templateUrl: 'market-vendors-list.html',
      replace: true,
      controller: ['$scope', 'MarketVendorsService', Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        market: '=',
        onMarketVendorSelected: '&'
      },
      link: function(scope, element, attributes) {

        scope.$on('market-vendor-selected-on-map', function(event, marketVendor) {
          event.preventDefault(); //[JG]: Required to prevent route change.
          if (marketVendor.id) {
           var target = document.getElementById('market-vendor-' + marketVendor.id);
           if (target) {
             target.scrollIntoView();
           }
          }
        });

      }
    };
  }
})();
