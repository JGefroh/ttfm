(function() {
  angular
    .module('ttfm.home', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('ttfm.home', {
        url: '/',
        templateUrl: 'markets-map.html',
        controller: 'MarketsMapController',
        controllerAs: 'vm'
    }).state('ttfm.about', {
        url: '/about',
        templateUrl: 'about.html'
    })
  }
})();
