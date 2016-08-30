(function() {
  angular
    .module('ttfm.locations')
    .service('LocationsService', ['BaseServiceFactory', Service]);

  function Service(BaseServiceFactory) {
    var service = BaseServiceFactory('location', 'locations');

    service.query = function() {
      return service.$http.get('data/dirty.json').then(function(response) {
        return scrub(response.data);
      });
    }

    function scrub(data) {
      var clean = [];
      angular.forEach(data, function(items) {
        angular.forEach(items, function(item) {
          clean.push(item.slice(8));
        })
      });

      var asObjects = [];
      angular.forEach(clean, function(marketArray, index) {
        var name = null;
        var location = null;
        var address = null;
        var addressOneLine = null;
        var website = null;
        var contactPhone = null;
        var contactEmail = null;
        var latitude = null;
        var longitude = null;
        if (marketArray[0]) {
          name = marketArray[0].split ? marketArray[0].split('\n')[0] : null;
        }
        if (marketArray[9]) {
          latitude = marketArray[9][1] ? Number(marketArray[9][1]) : null;
          longitude = marketArray[9][2] ? Number(marketArray[9][2]) : null;
          address = angular.fromJson(marketArray[9][0]);
          if (address) {
            addressOneLine = (address.address ? address.address + ' ' : '')
            + (address.city ? address.city + (address.state ? ', ' : ' ') : '')
            + (address.state ? address.state + ' ' : '')
            + (address.zip ? address.zip + '' : '');
          }
        }
        if (marketArray[11]) {
          if (marketArray[11].indexOf('http') !== -1 || marketArray[11].indexOf('www') !== -1) {
            website = marketArray[11].trim();
          }
        }
        if (!website && marketArray[12]) {
          website = marketArray[12][0];
        }
        if (marketArray[14]) {
          if (marketArray[14].indexOf('@') === -1) {
            contactPhone = marketArray[14];
          }
          else if (marketArray[14].indexOf('@') !== -1) {
            contactEmail = marketArray[14];
          }
        }
        if (!contactEmail && marketArray[15]) {
          contactEmail = marketArray[15];
        }
        var market = {
          id: index,
          name:  name,
          latitude: latitude,
          longitude: longitude,
          schedule: {
            sunday: !!marketArray[1],
            monday: !!marketArray[2],
            tuesday: !!marketArray[3],
            wednesday: !!marketArray[4],
            thursday: !!marketArray[5],
            friday: !!marketArray[6],
            saturday: !!marketArray[7],
            time: marketArray[8]
          },
          venue: {
            address: address,
            addressOneLine: addressOneLine,
            info: marketArray[10],
            latitude: latitude,
            longitude: longitude
          },
          organizer: {
            website: website,
            contact: {
              name: marketArray[13],
              phone: contactPhone,
              email: contactEmail
            }
          }
        }
        if (market.latitude && market.longitude) {
          asObjects.push(market);
        }
      });
      return asObjects;
    }

    return service;
  }
})();
