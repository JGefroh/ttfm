(function() {
  'use strict';
  angular
    .module('ttfm.markets')
    .controller('ImportExportController', ['$scope', 'MarketsService', Controller]);

  function Controller($scope, MarketsService) {
    var vm = this;
    function initialize() {
    }

    vm.exportData = function(adminExportCode) {
      vm.loadingExport = true;
      MarketsService.exportData({admin_code: adminExportCode}).catch(function(response) {
        console.info(response);
        vm.exportError = response.data.error;
      }).finally(function() {
        vm.loadingExport = false;
      })
    }

    vm.importData = function(adminImportCode, data) {
      vm.loadingImport = true;
      MarketsService.importData(adminImportCode, data).then(function(response) {
        console.info(response);
        vm.duplicates = response.duplicates;
        vm.created = response.created;
      }).finally(function() {
        vm.loadingImport = false;
        vm.results = true;
      });
    }

    vm.checkImportData = function(adminImportCode) {
      vm.importError = null;
      vm.loadingCheckImport = true;
      vm.importing = false;
      vm.results = false;
      vm.duplicates = [];
      vm.created = [];
      MarketsService.checkImportData({admin_code: adminImportCode}).then(function(data) {
        vm.importing = true;
        vm.markets = data;
      }).catch(function(response) {
        vm.importError = response.data.error;
      }).finally(function() {
        vm.loadingCheckImport = false;
      });
    }

    initialize();
  }
})();
