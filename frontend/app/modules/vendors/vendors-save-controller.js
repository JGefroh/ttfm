(function() {
  'use strict';
  angular
    .module('ttfm.vendors')
    .controller('VendorsSaveController', ['$scope', '$state', 'VendorsService', '$timeout', 'vendor', Controller]);

  function Controller($scope, $state, VendorsService, $timeout, vendor) {
    var vm = this;
    function initialize() {
      vm.vendor = vendor;
    }

    vm.save = function() {
      vm.errors = null;
      if (vm.vendor.days_of_week_as_array) {
        vm.vendor.days_of_week = vm.vendor.days_of_week_as_array.join(',');
      }
      if (vm.vendor.id) {
        return VendorsService.update(vm.vendor).then(function(savedVendor) {
          angular.copy(savedVendor, vm.vendor);
          updateVendorList(savedVendor);
        }).catch(function(response) {
          vm.errors = response.data.error;
        });
      }
      else {
        return VendorsService.save(vm.vendor).then(function(createdVendor) {
          angular.copy(createdVendor, vm.vendor);
          updateVendorList(createdVendor, true);
          $state.go('^');
        }).catch(function(response) {
          vm.errors = response.data.error;
        });
      }
    }

    function updateVendorList(vendor, isCreate) {
      if ($scope.$parent.vm.vendors) {
        if (isCreate) {
          $scope.$parent.vm.vendors.push(vendor);
        }
        else {
          angular.forEach($scope.$parent.vm.vendors, function(existingVendor) {
            if (vendor.id === existingVendor.id) {
              angular.copy(vendor, existingVendor);
            }
          });
        }
      }
    }

    vm.delete = function(vendor) {
      vm.errors = null;
      var index = -1;
      VendorsService.delete(vendor).then(function() {
        if ($scope.$parent.vm.vendors) {
          angular.forEach($scope.$parent.vm.vendors, function(existingVendor, currentIndex) {
            if (vendor.id === existingVendor.id) {
              index = currentIndex;
            }
          });
          if (index !== -1) {
            $scope.$parent.vm.vendors.splice(index, 1);
          }
          $state.go('^', {}, {location: 'replace'});
        }
      }).catch(function(response) {
        vm.errors = response.data.error;
      });
    }
    initialize();
  }
})();
