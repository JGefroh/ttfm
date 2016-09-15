(function() {
  angular
    .module('ttfm.market-vendors')
    .service('MarketVendorsService', ['$rootScope', '$sanitize', 'BaseServiceFactory', Service]);

  function Service($rootScope, $sanitize, BaseServiceFactory) {
    var service = BaseServiceFactory('market_vendor', 'market_vendors');
    return service;
  }
})();
