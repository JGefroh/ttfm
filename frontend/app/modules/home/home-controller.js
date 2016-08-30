(function() {
  'use strict';
  angular
    .module('ttfm.home')
    .controller('HomeController', ['$scope', 'LocationsService', 'locations', Controller]);

  function Controller($scope, LocationsService, locations) {
    var vm = this;
    function initialize() {
      initializeDateFilters();
      initializeLocations();
    }

    vm.toggleDateFilter = function(dateFilter) {
      var index = vm.activeDateFilters.indexOf(dateFilter);
      if (index === -1) {
        vm.activeDateFilters.push(dateFilter);
      }
      else {
        vm.activeDateFilters.splice(index, 1);
      }
    }

    vm.detectLocation = function() {
      vm.detectingLocation = true;
      navigator.geolocation.getCurrentPosition(function(response) {
        $scope.$applyAsync(function() {
          vm.currentLocation = response;
          vm.panToLocation(vm.currentLocation.coords);
          vm.detectingLocation = false;
        });
      }, function(response) {
        $scope.$applyAsync(function() {
          vm.detectingLocation = false;
        });
      });
    }

    vm.isActiveDateFilter = function(dateFilter) {
      return vm.activeDateFilters.indexOf(dateFilter) !== -1;
    }

    vm.panToLocation = function(location) {
      $scope.$broadcast('location:show', location);
    }

    vm.dateFilter = function(location) {
      if (!vm.activeDateFilters.length) {
        location.isHidden = false;
        return true;
      }
      var match = false;
      angular.forEach(vm.activeDateFilters, function(activeDateFilter) {
        if (location.schedule[activeDateFilter]) {
          match = true;
        }
      });
      if (match) {
        location.isHidden = false;
      }
      else {
        location.isHidden = true;
      }
      return match;
    }


    function initializeLocations() {
      if (!locations) {
        LocationsService.query().then(function(locations) {
          vm.locations = locations;
          LocationsService.cache('locations', locations);
        });
      }
      else {
        vm.locations = locations;
      }
    }

    vm.setFilter = function(dateFilter) {
      vm.activeDateFilters = [];
      vm.activeDateFilters.push(dateFilter.value);
      vm.isShowingOther = false;
    }

    function initializeDateFilters() {
      vm.activeDateFilters = [];
      vm.dateFilters = [
        {
          label: 'sun',
          value: 'sunday'
        },
        {
          label: 'mon',
          value: 'monday'
        },
        {
          label: 'tue',
          value: 'tuesday'
        },
        {
          label: 'wed',
          value: 'wednesday'
        },
        {
          label: 'thu',
          value: 'thursday'
        },
        {
          label: 'fri',
          value: 'friday'
        },
        {
          label: 'sat',
          value: 'saturday'
        }
      ];
      var todayDay = new Date().getDay();
      vm.today = vm.dateFilters[todayDay];
      if (todayDay <= 6) {
        vm.tomorrow = vm.dateFilters[todayDay + 1];
      }
      else {
        vm.tomorrow = vm.dateFilters[0];
      }
      vm.setFilter(vm.today);
    }
    initialize();
  }
})();
