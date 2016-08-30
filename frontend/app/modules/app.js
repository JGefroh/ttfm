(function() {
  'use strict';
  var webServiceBase = '{!api_host!}';

  angular
    .module('ttfm', [
            'ngSanitize',
            'ui.router',
            'ttfm.home',
            'ttfm.locations',
            'jgefroh.components'
          ]
    )
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);
      $stateProvider.state('ttfm', {
          url: '',
          templateUrl: 'standard-layout.html',
      })
      .state('ttfm-home_if_no_slash', { //[JG] Fixes blank screen when refreshing on home page
          url: '/',
          templateUrl: 'standard-layout.html'
      });
    }])
    .constant('config', {webServiceBase: webServiceBase})
    .controller('ApplicationController', ['$rootScope', '$scope', '$state',function($rootScope, $scope, $state) {
      var vm = this;
    }]);
})();
