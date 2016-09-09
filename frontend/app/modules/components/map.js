(function() {
  'use strict';
  angular
    .module('jgefroh.components')
    .directive('map', ['$window', '$filter', '$compile', '$sanitize', Directive]);
  function Directive($window, $filter, $compile, $sanitize) {
    function Controller() {
      var vm = this;
    }

    return {
      restrict: 'A',
      replace: true,
      template: '<div id="map" class="map"></div>',
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
        var myLatLng = {lat: 21.283142849689918, lng: -158.0157570068359};
        var infoWindow = new google.maps.InfoWindow({});
        var allMarkers = [];
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: myLatLng,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
          },
          mapTypeControl: false,
          streetViewControl: false,
          rotateControl: false,
          scaleControl: false,
          fullscreenControl: false,
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
          var bounds = null;
          angular.forEach(allMarkers, function(marker) {
            if (!bounds) {
              bounds = new google.maps.LatLngBounds();
              bounds.extend(marker.getPosition());
              bounds.extend(currentPositionMarker.getPosition());
            }
          })
          if (bounds) {
            map.fitBounds(bounds);
          }
          else {
            map.setZoom(16);
          }
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
           var label = marker.markerLabel;
           if (!marker.isHidden) {
             var marker = addMarker(map, marker.id, marker, label, marker.markerIcon);
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
