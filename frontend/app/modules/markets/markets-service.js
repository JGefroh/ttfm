(function() {
  angular
    .module('ttfm.markets')
    .service('MarketsService', ['$rootScope', 'BaseServiceFactory', Service]);

  function Service($rootScope, BaseServiceFactory) {
    var service = BaseServiceFactory('market', 'markets');
    return service;
  }
})();
