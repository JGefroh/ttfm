(function() {
  'use strict';
  angular
    .module('ttfm.markets')
    .controller('MarketsMapController', ['$scope', 'MarketsService', '$timeout', Controller]);

  function Controller($scope, MarketsService, $timeout) {
    var vm = this;
    var timeoutTilSearch;
    function initialize() {
      vm.loading = {};
      vm.errors = {};
      vm.bounds = {};
      vm.markets = [];
      vm.currentPosition = null;
      vm.daysSelected = [];
      vm.searchMode = 'bounds';
      initializeDays();

      $scope.$watch('vm.bounds', function() {
        if (timeoutTilSearch) {
          $timeout.cancel(timeoutTilSearch);
        }
        timeoutTilSearch = $timeout(function() {
          if (vm.searchMode === 'bounds') {
            vm.findWithin(vm.bounds);
          }
        }, 400);
      });
    }

    vm.findWithin = function(bounds) {
      var params = {
        ne_lat: bounds.getNorthEast().lat(),
        ne_lng: bounds.getNorthEast().lng(),
        sw_lat: bounds.getSouthWest().lat(),
        sw_lng: bounds.getSouthWest().lng(),
        ignore: getIdsFrom(vm.markets),
        find_within: true
      };

      vm.loading['query-markets'] = true;
      MarketsService.query(params).then(function(markets) {
        if (params.position_known) {
          vm.markets = markets;
        }
        else {
          mergeMarketLists(vm.markets, markets);
        }
      }).finally(function() {
          vm.loading['query-markets'] = false;
      });
    }

    function mergeMarketLists(existingMarkets, newMarkets) {
      angular.forEach(newMarkets, function(newMarket) {
        var alreadyInList = false;
        angular.forEach(existingMarkets, function(existingMarket) {
          if (existingMarket.id === newMarket.id) {
            alreadyInList = true;
          }
        });
        if (!alreadyInList) {
          existingMarkets.push(newMarket);
        }
      });
    }

    function getIdsFrom(markets) {
      var ids = [];
      angular.forEach(markets, function(market) {
        if (market.id) {
          ids.push(market.id);
        }
      });
      return ids.join(',');
    }

    vm.detectLocation = function() {
      if (navigator.geolocation) {
        vm.loading['detect-location'] = true;
        navigator.geolocation.getCurrentPosition(function(currentPosition) {
          vm.currentPosition = currentPosition.coords;
          vm.searchMode = 'nearby';
          $scope.$broadcast('location:show', currentPosition.coords);
          var params = {
            position_known: true,
            current_lat: vm.currentPosition ? vm.currentPosition.latitude : null,
            current_lng: vm.currentPosition ? vm.currentPosition.longitude : null
          };
          vm.loading['query-markets'] = true;
          MarketsService.query(params).then(function(nearbyMarkets) {
            vm.markets = nearbyMarkets;
          }).finally(function() {
            vm.loading['query-markets'] = false;
          });

          vm.loading['detect-location'] = false;
        }, function() {
          vm.showAll();
          vm.loading['detect-location'] = false;
        });
      }
    }

    vm.showAll = function() {
      vm.searchMode = 'bounds';
      vm.findWithin(vm.bounds);
    }

    vm.showNearby = function() {
      vm.detectLocation();
    }

    vm.panToMarket = function(market) {
      $scope.$broadcast('location:show', market);
    };

    function initializeDays() {
      vm.days = [
        {
          label: "sun",
          value: 0
        },
        {
          label: "mon",
          value: 1
        },
        {
          label: "tue",
          value: 2
        },
        {
          label: "wed",
          value: 3
        },
        {
          label: "thu",
          value: 4
        },
        {
          label: "fri",
          value: 5
        },
        {
          label: "sat",
          value: 6
        }
      ];
      vm.daysSelected.push(vm.days[new Date().getDay()]);
    }

    vm.toggleDay = function(day) {
      var index = vm.daysSelected.indexOf(day);
      if (index !== -1) {
        vm.daysSelected.splice(index, 1);
      }
      else {
        vm.daysSelected.push(day);
      }
    }

    vm.isDaySelected = function(day) {
      var index = vm.daysSelected.indexOf(day);
      return index !== -1;
    }
    initialize();
  }
})();
