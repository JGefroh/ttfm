(function() {
  angular
    .module('ttfm.markets')
    .service('MarketsService', ['$rootScope', 'BaseServiceFactory', Service]);

  function Service($rootScope, BaseServiceFactory) {
    var service = BaseServiceFactory('market', 'markets');

    service.checkImportData = function(credentials) {
      return service.$http.post(service.collectionsUrl() + '/check_import_data', credentials).then(service.getResponsePayload);
    }
    service.importData = function(adminCode, data) {
      return service.$http.post(service.collectionsUrl() + '/import_data', {admin_code: adminCode, data: data}).then(function(response) {
        return response.data;
      });
    }
    service.exportData = function(credentials) {
      return service.$http.post(service.collectionsUrl() + '/export_data', credentials).then(service.getResponsePayload);
    }

    service.toCoordinates = function(address) {
      return service.$http.get(service.collectionsUrl() + '/to_coordinates', {params: {address: address}}).then(service.getResponsePayload);
    }
    return service;
  }
})();
