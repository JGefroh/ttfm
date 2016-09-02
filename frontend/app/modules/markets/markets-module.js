(function() {
  angular
    .module('ttfm.markets', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('ttfm.markets', {
        url: '/markets',
        abstract: true,
        templateUrl: 'standard-layout'
      }).state('ttfm.markets.list', {
        url: '/list',
        templateUrl: 'markets-list.html',
        controller: 'MarketsListController',
        controllerAs: 'vm'
      }).state('ttfm.markets.admin', {
        url: '/admin',
        templateUrl: 'import-export.html',
        controller: 'ImportExportController',
        controllerAs: 'vm'
    });;
  }
})();
