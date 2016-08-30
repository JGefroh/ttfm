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
        markers: '='
      },
      link: function(scope, element, attributes) {
        var myLatLng = {lat: 21.3000, lng: -157.8167};
        var infoWindow = new google.maps.InfoWindow({});
        var allMarkers = [];
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: myLatLng
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
             addMarker(map, marker.id, marker, label);
           }
         });
       }, true);

       function clearMarkers() {
         angular.forEach(allMarkers, function(marker) {
           marker.setMap(null);
         });
         allMarkers = [];
       }

       function addMarker(map, id, position, content) {
         if (angular.isNumber(position.latitude) && angular.isNumber(position.longitude)) {
           var marker = new google.maps.Marker({
             id: id,
             map: map,
             position: {lat: position.latitude, lng: position.longitude},
             content: content
           });
           marker.addListener('click', function() {
             openInfoWindow(map, marker);
           });
           allMarkers.push(marker);
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
