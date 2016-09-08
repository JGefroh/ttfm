(function() {
  'use strict';
  angular
    .module('ttfm.markets')
    .controller('MarketsMapController', ['$scope', '$state', 'MarketsService', '$timeout', Controller]);

  function Controller($scope, $state, MarketsService, $timeout) {
    var vm = this;
    var timeoutTilSearch;
    var GEOLOCATION_TIMEOUT_IN_MS = 10000;
    function initialize() {
      vm.loading = {};
      vm.errors = {};
      vm.bounds = {};
      vm.markets = [];
      vm.currentPosition = null;
      vm.daysSelected = [];
      vm.searchMode = 'bounds';
      initializeDays();
      initializeMapChangeWatcher();
      initializeMapToggleListener();
    }

    vm.detectLocation = function() {
      if (navigator && navigator.geolocation) {
        vm.loading['detect-location'] = true;
        navigator.geolocation.getCurrentPosition(function(currentPosition) {
          $scope.$applyAsync(function() {
            vm.currentPosition = currentPosition.coords;
            vm.findNearby(vm.currentPosition);
            vm.loading['detect-location'] = false;
          });
        }, function() {
          $scope.$applyAsync(function() {
            vm.promptLocation();
            vm.loading['detect-location'] = false;
          });
        }, {timeout: GEOLOCATION_TIMEOUT_IN_MS});
      }
      else {
        vm.promptLocation();
      }
    }

    vm.findNearby = function(currentPosition) {
      if (!currentPosition) {
        return;
      }
      vm.searchMode = 'nearby';
      $scope.$broadcast('location:show', {latitude: currentPosition.latitude, longitude: currentPosition.longitude});
      var params = {
        position_known: true,
        current_lat: currentPosition ? currentPosition.latitude : null,
        current_lng: currentPosition ? currentPosition.longitude : null
      };
      vm.loading['query-markets'] = true;
      MarketsService.query(params).then(function(nearbyMarkets) {
        buildMarkerLabels(nearbyMarkets);
        vm.markets = nearbyMarkets;
      }).finally(function() {
        vm.loading['query-markets'] = false;
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
        buildMarkerLabels(markets);
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

    vm.promptLocation = function() {
      vm.showPrompt = true;
    }

    vm.identifyLocation = function(address) {
      return MarketsService.toCoordinates(address).then(function(coordinates) {
        vm.showPrompt = false;
        vm.currentPosition = coordinates;
        vm.findNearby(coordinates);
      });
    }

    vm.showAll = function() {
      vm.searchMode = 'bounds';
      vm.findWithin(vm.bounds);
    }

    vm.showNearby = function() {
      vm.detectLocation();
    }

    vm.selectMarket = function(market) {
      $scope.$broadcast('location:show', market);
      vm.expanded = false;
      if (!vm.isShowingMap) {
        $state.go('ttfm.markets.browse.show', {id: market.id});
      }
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
      vm.daysSelected = [day];
    }

    vm.isDaySelected = function(day) {
      var index = vm.daysSelected.indexOf(day);
      return index !== -1;
    }

    function initializeMapChangeWatcher() {
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

    function initializeMapToggleListener() {
      $scope.$watch(function() {
        return $state.params.id;
      }, function() {
        vm.isShowingMap = !$state.params.id;
      });
    }

    function buildMarkerLabels(markets) {
      MarketsService.buildMarkerLabels(markets);
    }

    initialize();
  }
})();
