(function() {
  angular
    .module('ttfm.security', [])
    .config(['$stateProvider', Routes])
    .run(['$state', '$rootScope', RouteSecurity]);

  function Routes($stateProvider) {
    $stateProvider
      .state('ttfm.admin', {
        url: '/admin',
        requiresAuthentication: true,
        views: {
          '': {
            templateUrl: 'markets-admin.html',
            controller: 'MarketsAdminController',
            controllerAs: 'vm'
          }
        }
      })
      .state('ttfm.sign-in', {
          url: '/sign-in',
          reloadOnSearch: false,
          template: '<div data-sign-in></div>'
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
