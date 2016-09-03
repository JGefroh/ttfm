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
             label =
                      ['<span style="font-weight: bold;">',
                         $sanitize(marker.name),
                        '</span><br/>',
                        $sanitize(marker.address),
                        '<br/>',
                        $sanitize(getSchedule(marker))
                      ].join('');
             var marker = addMarker(map, marker.id, marker, label);
             if (marker) {
               allMarkers.push(marker);
             }
           }
         });
       }, true);

       function getSchedule(marker) {
         if (!marker || !marker.days_of_week) {
           return;
         }
         var schedule = [];
         if (marker.days_of_week.indexOf('sun') !== -1) {
           schedule.push('Sunday');
         }
         if (marker.days_of_week.indexOf('mon') !== -1) {
           schedule.push('Monday');
         }
         if (marker.days_of_week.indexOf('tue') !== -1) {
           schedule.push('Tuesday');
         }
         if (marker.days_of_week.indexOf('wed') !== -1) {
           schedule.push('Wednesday');
         }
         if (marker.days_of_week.indexOf('thu') !== -1) {
           schedule.push('Thursday');
         }
         if (marker.days_of_week.indexOf('fri') !== -1) {
           schedule.push('Friday');
         }
         if (marker.days_of_week.indexOf('sat') !== -1) {
           schedule.push('Saturday');
         }
         return schedule.join(', ');
       }

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
