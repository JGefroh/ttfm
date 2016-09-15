(function() {
  angular
    .module('ttfm.vendors')
    .service('VendorsService', ['$rootScope', '$sanitize', 'BaseServiceFactory', Service]);

  function Service($rootScope, $sanitize, BaseServiceFactory) {
    var service = BaseServiceFactory('vendor', 'vendors');

    service.addMarket = function(vendor, market, boothLocation) {
      return service.$http.put(service.memberUrl(vendor.id) + '/add_market', {market_id: market.id, booth_location: boothLocation}).then(service.getResponseData);
    }
    service.removeMarket = function(vendor, market) {
      return service.$http.put(service.memberUrl(vendor.id) + '/remove_market', {market_id: market.id}).then(service.getResponsePayload);
    }
    return service;
  }
})();
