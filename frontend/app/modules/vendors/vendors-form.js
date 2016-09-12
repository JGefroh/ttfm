(function() {
  'use strict';
  angular
    .module('ttfm.vendors')
    .directive('vendorsForm', Directive);
  function Directive() {
    function Controller($scope, VendorsService, MarketsService) {
      var vm = this;
      vm.allMarkets = [];
      vm.vendorMarkets = [];
      MarketsService.query().then(function(markets) {
        vm.allMarkets = markets;
      });

      MarketsService.query({vendor_id: vm.vendor.id}).then(function(markets) {
        vm.vendorMarkets = markets;
      });

      vm.addMarket = function(market) {
        $scope.$parent.vm.errors = null;
        VendorsService.addMarket(vm.vendor, market).then(function(market) {
          vm.vendorMarkets.push(market);
        }).catch(function(response) {
          $scope.$parent.vm.errors = response.data.error;
        });
      }

      vm.removeMarket = function(market) {
        $scope.$parent.vm.errors = null;
        VendorsService.removeMarket(vm.vendor, market).then(function() {
          vm.vendorMarkets.splice(vm.vendorMarkets.indexOf(market), 1);
        }).catch(function(response) {
          $scope.$parent.vm.errors = response.data.error;
        });
      }

      vm.isNotOnVendor = function(market) {
        var isDuplicate = false;
        angular.forEach(vm.vendorMarkets, function(vendorMarket) {
          if (market.id === vendorMarket.id) {
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
      controller: ['$scope', 'VendorsService', 'MarketsService', Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        vendor: '=',
        save: '&'
      }
    };
  }
})();
