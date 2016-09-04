(function() {
  'use strict';
  angular
    .module('ttfm.markets')
    .controller('MarketsAdminController', ['$scope', 'MarketsService', '$timeout', Controller]);

  function Controller($scope, MarketsService, $timeout) {
    var vm = this;
    function initialize() {
      MarketsService.query().then(function(markets) {
        vm.markets = markets;
      }).finally(function() {
          vm.loading['query-markets'] = false;
      });
    }

    initialize();
  }
})();
