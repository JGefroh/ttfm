(function() {
  'use strict';
  var webServiceBase = '{!api_host!}';
  var analyticsEnabled = '{!analytics_enabled!}';
  var googleMapsAPIKey = 'AIzaSyCgNsKGtrqTlN4uRXj6HbzR-drBWKqqHxA'; //Also in index.html
  angular
    .module('ttfm', [
            'angulartics',
            'angulartics.google.analytics',
            'ngSanitize',
            'ui.router',
            'ttfm.home',
            'ttfm.markets',
            'jgefroh.components'
          ]
    )
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/markets');
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
    .config(['$analyticsProvider', function($analyticsProvider) {
      $analyticsProvider.developerMode('true' != analyticsEnabled);
    }])
    .constant('config', {webServiceBase: webServiceBase, googleMapsAPIKey: googleMapsAPIKey})
    .controller('ApplicationController', ['$sce', '$rootScope', '$scope', '$state',function($sce, $rootScope, $scope, $state) {
      var vm = this;
    }]);
})();
