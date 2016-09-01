(function() {
  'use strict';
  angular
    .module('ttfm.markets')
    .controller('MarketsMapController', ['$scope', 'MarketsService', '$timeout', Controller]);

  function Controller($scope, MarketsService, $timeout) {
    var vm = this;
    var timeoutTilSearch;
    var ignoreMovement = false;
    function initialize() {
      vm.loading = {};
      vm.errors = {};
      vm.bounds = {};
      vm.currentPosition = null;

      $scope.$watch('vm.bounds', function() {
        if (timeoutTilSearch) {
          vm.loading['query-markets'] = false;
          $timeout.cancel(timeoutTilSearch);
        }
        if (!ignoreMovement) {
          vm.loading['query-markets'] = true;
          timeoutTilSearch = $timeout(function() {
            vm.findWithin(vm.bounds);
          }, 1000);
        }
      });
    }

    vm.findWithin = function(bounds) {
      var params = {
        ne_lat: bounds.getNorthEast().lat(),
        ne_lng: bounds.getNorthEast().lng(),
        sw_lat: bounds.getSouthWest().lat(),
        sw_lng: bounds.getSouthWest().lng(),
        find_within: true,
        position_known: !!vm.currentPosition,
        current_lat: vm.currentPosition ? vm.currentPosition.latitude : null,
        current_lng: vm.currentPosition ? vm.currentPosition.longitude : null
      };

      vm.loading['query-markets'] = true;
      MarketsService.query(params).then(function(markets) {
        vm.markets = markets;
      }).finally(function() {
          vm.loading['query-markets'] = false;
      });
    }

    vm.detectLocation = function() {
      if (navigator.geolocation) {
        vm.loading['detect-location'] = true;
        navigator.geolocation.getCurrentPosition(function(currentPosition) {
          vm.currentPosition = currentPosition.coords;
          $scope.$broadcast('location:show', currentPosition.coords);
          vm.loading['detect-location'] = false;
        }, function() {
          vm.loading['detect-location'] = false;
        });
      }
    }

    vm.panToMarket = function(market) {
      ignoreMovement = true;
      $scope.$broadcast('location:show', market);
      $timeout(function() {
        ignoreMovement = false;
      }, 600);
    };

    initialize();
  }
})();
