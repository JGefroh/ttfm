(function() {
  'use strict';
  angular
    .module('ttfm.markets')
    .controller('MarketsSaveController', ['$scope', '$state', 'MarketsService', '$timeout', 'market', Controller]);

  function Controller($scope, $state, MarketsService, $timeout, market) {
    var vm = this;
    function initialize() {
      vm.market = market;
    }

    vm.save = function() {
      vm.errors = null;
      if (vm.market.days_of_week_as_array) {
        vm.market.days_of_week = vm.market.days_of_week_as_array.join(',');
      }
      if (vm.market.id) {
        return MarketsService.update(vm.market, {admin_code: $scope.$parent.vm.adminCode}).then(function(savedMarket) {
          angular.copy(savedMarket, vm.market);
          updateMarketList(savedMarket);
        }).catch(function(response) {
          vm.errors = response.data.error;
        });
      }
      else {
        return MarketsService.save(vm.market, {admin_code: $scope.$parent.vm.adminCode}).then(function(createdMarket) {
          angular.copy(createdMarket, vm.market);
          updateMarketList(createdMarket, true);
          $state.go('^');
        }).catch(function(response) {
          vm.errors = response.data.error;
        });
      }
    }

    function updateMarketList(market, isCreate) {
      if ($scope.$parent.vm.markets) {
        if (isCreate) {
          $scope.$parent.vm.markets.push(market);
        }
        else {
          angular.forEach($scope.$parent.vm.markets, function(existingMarket) {
            if (market.id === existingMarket.id) {
              angular.copy(market, existingMarket);
            }
          });
        }
      }
    }

    vm.delete = function(market) {
      vm.errors = null;
      var index = -1;
      MarketsService.delete(market, {admin_code: $scope.$parent.vm.adminCode}).then(function() {
        if ($scope.$parent.vm.markets) {
          angular.forEach($scope.$parent.vm.markets, function(existingMarket, currentIndex) {
            if (market.id === existingMarket.id) {
              index = currentIndex;
            }
          });
          if (index !== -1) {
            $scope.$parent.vm.markets.splice(index, 1);
          }
          $state.go('^', {}, {location: 'replace'});
        }
      }).catch(function(response) {
        vm.errors = response.data.error;
      });
    }
    initialize();
  }
})();
