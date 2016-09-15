(function() {
  'use strict';
  angular
    .module('ttfm.vendors')
    .directive('vendorsForm', Directive);
  function Directive() {
    function Controller($scope, VendorsService, MarketsService, MarketVendorsService) {
      var vm = this;
      vm.allMarkets = [];
      vm.marketVendors = [];
      MarketsService.query().then(function(markets) {
        vm.allMarkets = markets;
      });

      MarketVendorsService.query({vendor_id: vm.vendor.id}).then(function(marketVendors) {
        vm.marketVendors = marketVendors;
      });

      vm.addMarket = function(market, boothLocation) {
        $scope.$parent.vm.errors = null;
        VendorsService.addMarket(vm.vendor, market, boothLocation).then(function(marketVendor) {
          vm.marketVendors.push(marketVendor);
        }).catch(function(response) {
          $scope.$parent.vm.errors = response.data.error;
        });
      }

      vm.removeMarket = function(marketVendor) {
        $scope.$parent.vm.errors = null;
        VendorsService.removeMarket(vm.vendor, marketVendor.market).then(function() {
          vm.marketVendors.splice(vm.marketVendors.indexOf(marketVendor), 1);
        }).catch(function(response) {
          $scope.$parent.vm.errors = response.data.error;
        });
      }

      vm.isNotOnVendor = function(market) {
        var isDuplicate = false;
        angular.forEach(vm.marketVendors, function(existingMarketVendor) {
          if (market.id === existingMarketVendor.market.id) {
            isDuplicate = true;
          }
        });
        return isDuplicate ? null : market;
      }
    }

    return {
      restrict: 'A',
      templateUrl: 'vendors-form.html',
      replace: true,
      controller: ['$scope', 'VendorsService', 'MarketsService', 'MarketVendorsService', Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        vendor: '=',
        save: '&'
      }
    };
  }
})();
