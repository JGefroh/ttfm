(function() {
  'use strict';
  angular
    .module('ttfm.markets')
    .controller('MarketsShowController', ['$scope', 'MarketsService', '$timeout', 'market', Controller]);

  function Controller($scope, MarketsService, $timeout, market) {
    var vm = this;
    function initialize() {
      vm.market = market;
    }
    initialize();
  }
})();
