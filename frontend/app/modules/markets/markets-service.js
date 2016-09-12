(function() {
  angular
    .module('ttfm.markets')
    .service('MarketsService', ['$rootScope', '$sanitize', 'BaseServiceFactory', Service]);

  function Service($rootScope, $sanitize, BaseServiceFactory) {
    var service = BaseServiceFactory('market', 'markets');

    service.checkImportData = function(adminCode) {
      return service.$http.post(service.collectionsUrl() + '/check_import_data', {admin_code: adminCode}).then(service.getResponsePayload);
    }
    service.importData = function(adminCode, data) {
      return service.$http.post(service.collectionsUrl() + '/import_data', {admin_code: adminCode, data: data}).then(function(response) {
        return response.data;
      });
    }
    service.exportData = function(adminCode) {
      return service.$http.post(service.collectionsUrl() + '/export_data', {admin_code: adminCode}).then(service.getResponsePayload);
    }

    service.toCoordinates = function(adminCode, address) {
      return service.$http.get(service.collectionsUrl() + '/to_coordinates', {params: {admin_code: adminCode, address: address}}).then(service.getResponsePayload);
    }

    service.getTimeString = function(market) {
      var time = '';
      if (market.start_time && market.end_time) {
        time = market.start_time + ' to ' + market.end_time;
      }
      else if (market.start_time || market.end_time) {
        if (market.start_time) {
          time = 'Starts at ' + market.start_time;
        }
        else {
          time = 'Ends at ' + market.end_time;
        }
      }
      return time;
    }


    service.buildMarkerLabels = function(markets) {
      angular.forEach(markets, function(market) {
        var time = service.getTimeString(market);

        var organization = null;
        if (market.organization === 'hfbf') {
          market.icon = '/images/HFBF_logo_only_200.png';
          organization = 'The Hawaii Farm Bureau'
        }
        else if (market.organization === 'pom') {
          market.icon = '/images/POM_Logo_transparent.png';
          organization = 'People\'s Open Market'
        }
         market.markerLabel =
                  ['<a href="/markets/' + market.id + '" style="font-weight: bold;" rel="noopener">',
                    $sanitize(market.name),
                    '</a><br/>',
                    $sanitize(market.address),
                    '<br/><span style="text-transform: capitalize">',
                    $sanitize(market.days_of_week_as_array.join(', ')),
                    '</span>',
                    time ? '<br/>' + time : '',
                    organization ? '<br/> Organized by ' + organization : ''
                  ].join('');
      });
      return markets;
    }
    return service;
  }
})();
