(function() {
  'use strict';
  angular
    .module('jgefroh.components')
    .directive('addressAutocomplete', Directive);
  function Directive() {
    return {
      restrict: 'A',
      scope: {
        ngModel: '='
      },
      link: function(scope, element, attributes) {
        var input = element[0]
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          scope.$apply(function() {
            scope.ngModel = place.formatted_address;
          });
        });

        scope.$on('$destroy', function() {
          google.maps.event.clearInstanceListeners(element);
        });
      }
    };
  }
})();
