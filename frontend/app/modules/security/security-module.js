(function() {
  angular
    .module('ttfm.security', [])
    .config(['$stateProvider', Routes])
    .run(['$state', '$rootScope', RouteSecurity]);

  function Routes($stateProvider) {
    $stateProvider
        .state('ttfm.sign-in', {
            url: '/sign-in',
            reloadOnSearch: false,
            template: '<div data-sign-in></div>',
        })
  }

  function RouteSecurity($state, $rootScope) {
    $rootScope.adminCode = window.localStorage.adminCode;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (toState.requiresAuthentication) {
        if (!$rootScope.adminCode) {
          event.preventDefault();
          $state.go('ttfm.sign-in')
        }
      }
    });
  }
})();
