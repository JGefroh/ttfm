(function() {
  angular
    .module('ttfm.security')
    .factory('AuthenticationHeaderInterceptor', ['$rootScope', Interceptor])
    .config(['$httpProvider', Configuration]);

  function Interceptor($rootScope) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = $rootScope.adminCode;
            return config;
        }
    };
  }

  function Configuration($httpProvider) {
    $httpProvider.interceptors.push('AuthenticationHeaderInterceptor');
  }
})();
