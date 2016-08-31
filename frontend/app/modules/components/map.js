(function() {
  'use strict';
  angular
    .module('jgefroh.components')
    .directive('map', ['$filter', '$compile', '$sanitize', Directive]);
  function Directive($filter, $compile, $sanitize) {
    function Controller() {
      var vm = this;
    }

    return {
      restrict: 'A',
      replace: true,
      template: '<div class="map-wrapper">' +
                  '<div id="map" class="map">' +
                  '</div>' +
                '</div>',
      replace: true,
      controller: [Controller],
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        markers: '=',
        bounds: '='
      },
      link: function(scope, element, attributes) {
        var currentPositionMarker = null;
        var myLatLng = {lat: 21.3000, lng: -157.8167};
        var infoWindow = new google.maps.InfoWindow({});
        var allMarkers = [];
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: myLatLng
        });

      google.maps.event.addListener(map, "bounds_changed", function() {
        scope.$applyAsync(function() {
          scope.vm.bounds = map.getBounds();
        });
      });
       scope.$on('location:show', function(event, payload) {
         var marker = getMarkerWithId(payload.id);
         if (marker && marker.latitude) {
           map.panTo(new google.maps.LatLng(marker.latitude, marker.longitude));
           map.setZoom(16);
           openInfoWindow(map, getGoogleMarkerWithId(payload.id));
         }
         else {
           map.panTo(new google.maps.LatLng(payload.latitude, payload.longitude));
           if (currentPositionMarker) {
             currentPositionMarker.setMap(null);
           }
           currentPositionMarker = addMarker(map, -1, payload, 'You are here!', '/images/marker-current-location.png');
           map.setZoom(16);
         }
       });

       function getGoogleMarkerWithId(id) {
         var match = null;
         angular.forEach(allMarkers, function(marker) {
           if (marker.id === id) {
             match = marker;
           }
         });
         return match;
       }

       function getMarkerWithId(id) {
         var match = null;
         angular.forEach(scope.vm.markers, function(marker) {
           if (marker.id === id) {
             match = marker;
           }
         });
         return match;
       }

       scope.$watch('vm.markers', function(newValue, oldValue) {
         clearMarkers();
         angular.forEach(newValue, function(marker) {
           var content = '';
           var label = marker.name;
           if (!marker.isHidden) {
             var marker = addMarker(map, marker.id, marker, label);
             if (marker) {
               allMarkers.push(marker);
             }
           }
         });
       }, true);

       function clearMarkers() {
         angular.forEach(allMarkers, function(marker) {
           marker.setMap(null);
         });
         allMarkers = [];
       }

       function addMarker(map, id, position, content, icon) {
         if (angular.isNumber(position.latitude) && angular.isNumber(position.longitude)) {
           var marker = new google.maps.Marker({
             id: id,
             map: map,
             position: {lat: position.latitude, lng: position.longitude},
             icon: icon,
             content: content
           });
           marker.addListener('click', function() {
             openInfoWindow(map, marker);
           });
           return marker;
         }
       }

       function openInfoWindow(map, marker) {
         infoWindow.setContent(marker.content);
         infoWindow.setPosition(marker.position);
         infoWindow.open(map);
       }
      }
    };
  }
})();
