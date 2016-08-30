(function() {
  angular
    .module('ttfm.locations', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('ttfm.locations', {
        url: '/locations',
        templateUrl: 'standard-layout.html',
        abstract: true
    }).state('ttfm.locations.show', {
        url: '/{id:int}',
        templateUrl: 'locations-show.html',
        controller: 'LocationsShowController',
        controllerAs: 'vm',
        resolve: {
          location: ['LocationsService', '$stateParams', resolveLocation]
        }
    }).state('ttfm.locations.new', {
        url: '/new',
        templateUrl: 'locations-new.html',
        controller: 'LocationsSaveController',
        controllerAs: 'vm',
        resolve: {
          location: function() {
            return {};
          }
        }
    }).state('ttfm.locations.edit', {
        url: '/{id:int}/edit',
        templateUrl: 'locations-edit.html',
        controller: 'LocationsSaveController',
        controllerAs: 'vm',
        resolve: {
          location: ['LocationsService', '$stateParams', resolveLocation]
        }
    });

    function resolveLocations(LocationsService) {
      return LocationsService.cache('locations').value || false;
    }

    function resolveLocation(LocationsService, $stateParams) {
      return LocationsService.query().then(function(locations) {
        var match = null;
        angular.forEach(locations, function(location) {
          if (location.id === $stateParams.id) {
            match = location;
          }
        });
        return match;
      })
      // return LocationsService.get($stateParams.id).then(function(location) {
      //   return location;
      // });
    }
  }
})();
