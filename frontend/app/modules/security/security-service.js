(function() {
  angular
    .module('ttfm.security')
    .service('SecurityService', ['$state', '$rootScope', '$sanitize', 'BaseServiceFactory', Service]);

  function Service($state, $rootScope, $sanitize, BaseServiceFactory) {
    var service = BaseServiceFactory('security', 'security');

    service.signIn = function(password) {
      return service.$http.post(service.collectionsUrl() + '/sign_in', {admin_code: password}).then(service.getResponsePayload).then(function(data) {
        $rootScope.adminCode = password;
        window.localStorage.adminCode = password;
      });
    }

    service.signOut = function() {
      delete $rootScope.adminCode;
      delete window.localStorage.adminCode;
      $state.go('ttfm.home');
    }
    return service;
  }
})();
