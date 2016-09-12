(function() {
  angular
    .module('ttfm.vendors', [])
    .config(['$stateProvider', Routes]);

  function Routes($stateProvider) {

    $stateProvider.state('ttfm.vendors', {
        url: '/vendors',
        abstract: true,
        templateUrl: 'standard-layout.html'
      })
      .state('ttfm.vendors.admin', {
        url: '/admin',
        views: {
          '': {
            templateUrl: 'vendors-admin.html',
            controller: 'VendorsAdminController',
            controllerAs: 'vm'
          }
        }
      }).state('ttfm.vendors.admin.edit', {
        url: '/{id:int}/edit',
        views: {
          'show-and-edit': {
            templateUrl: 'vendors-edit.html',
            controller: 'VendorsSaveController',
            controllerAs: 'vm',
            resolve: {
              vendor: ['VendorsService', '$stateParams', resolveVendor]
            }
          }
        }
      }).state('ttfm.vendors.admin.new', {
        url: '/new',
        views: {
          'show-and-edit': {
            templateUrl: 'vendors-new.html',
            controller: 'VendorsSaveController',
            controllerAs: 'vm',
            resolve: {
              vendor: function() {
                return {};
              }
            }
          }
        }
      });

      function resolveVendor(VendorsService, $stateParams) {
        return VendorsService.get($stateParams.id).then(function(vendor) {
          return vendor;
        });
      }
  }
})();
