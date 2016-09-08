(function() {
  angular
    .module('ttfm.home', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('ttfm.home', {
        url: '/',
        templateUrl: 'home.html',
    }).state('ttfm.about', {
        url: '/about',
        templateUrl: 'about.html'
    })
  }
})();
