(function() {
  'use strict';
  angular
    .module('ttfm.markets')
    .controller('MarketsListController', ['$scope', 'MarketsService', '$timeout', Controller]);

  function Controller($scope, MarketsService, $timeout) {
    var vm = this;
    function initialize() {
      var params = {
        current_lat: vm.currentPosition ? vm.currentPosition.latitude : null,
        current_lng: vm.currentPosition ? vm.currentPosition.longitude : null
      }
      
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
          vm.loading['detect-location'] = false;
        }, function() {
          vm.loading['detect-location'] = false;
        });
      }
      else {
        vm.loading['detect-location'] = false;
      }
    }
    initialize();
  }
})();
