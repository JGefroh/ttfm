(function() {
  angular
    .module('ttfm.markets', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {
    $stateProvider.state('ttfm.markets', {
        url: '/markets',
        abstract: true
    });
  }
})();
