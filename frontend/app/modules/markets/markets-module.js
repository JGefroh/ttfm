(function() {
  angular
    .module('ttfm.markets', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('ttfm.markets', {
        url: '/markets',
        abstract: true,
        templateUrl: 'standard-layout.html'
      })
      .state('ttfm.markets.browse', {
        url: '',
        controller: 'MarketsMapController',
        controllerAs: 'vm',
        templateUrl: 'markets-map.html'
      })
      .state('ttfm.markets.admin', {
        url: '/admin',
        views: {
          '': {
            templateUrl: 'markets-admin.html',
            controller: 'MarketsAdminController',
            controllerAs: 'vm'
          }
        }
      }).state('ttfm.markets.admin.edit', {
        url: '/{id:int}/edit',
        views: {
          'show-and-edit': {
            templateUrl: 'markets-edit.html',
            controller: 'MarketsSaveController',
            controllerAs: 'vm',
            resolve: {
              market: ['MarketsService', '$stateParams', resolveMarket]
            }
          }
        }
      }).state('ttfm.markets.admin.new', {
        url: '/new',
        views: {
          'show-and-edit': {
            templateUrl: 'markets-new.html',
            controller: 'MarketsSaveController',
            controllerAs: 'vm',
            resolve: {
              market: function() {
                return {};
              }
            }
          }
        }
      }).state('ttfm.markets.admin.sync', {
        url: '/sync',
        views: {
          'show-and-edit': {
            templateUrl: 'import-export.html',
            controller: 'ImportExportController',
            controllerAs: 'vm'
          }
        }
      }).state('ttfm.markets.browse.show', {
        url: '/{id:int}',
        views: {
          'show-and-edit': {
            templateUrl: 'markets-show.html',
            controller: 'MarketsShowController',
            controllerAs: 'vm',
            resolve: {
              market: ['MarketsService', '$stateParams', resolveMarket]
            }
          }
        }
      });

      function resolveMarket(MarketsService, $stateParams) {
        return MarketsService.get($stateParams.id).then(function(market) {
          return market;
        });
      }
  }
})();
