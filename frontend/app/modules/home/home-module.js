(function() {
  angular
    .module('ttfm.home', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('ttfm.home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        resolve: {
          locations: ['LocationsService', '$stateParams', resolveLocations]
        }
    });
  }

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
})();
