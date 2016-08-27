(function() {
  'use strict';
  var webServiceBase = '{!api_host!}';

  angular
    .module('ttfm', [
          ]
    )
    .config(['$urlRouterProvider', '$locationProvider', function($urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');
    }])
    .constant('config', {webServiceBase: webServiceBase})
    .controller('ApplicationController', ['$rootScope', '$scope', '$state',function($rootScope, $scope, $state) {
      var vm = this;
    }]);
})();
