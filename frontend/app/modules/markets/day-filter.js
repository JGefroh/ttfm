(function() {
  angular
    .module('ttfm.markets')
    .filter('day', [Filter]);

  function Filter() {
    return function(markets, selectedDays) {
      var matches = [];
      if (!selectedDays || !selectedDays.length) {
        angular.forEach(markets, function(market) {
          market.isHidden = false;
        });

        return markets;
      }
      else {
        angular.forEach(markets, function(market) {
          if (market.days_of_week_as_array.length) {
            var match = false;
            angular.forEach(selectedDays, function(selectedDay) {
              if (market.days_of_week_as_array.indexOf(selectedDay.label) !== -1) {
                match = true;
              }
            });
            if (match) {
              matches.push(market);
              market.isHidden = false;
            }
            else {
              market.isHidden = true;
            }
          }
        });
      }
      return matches;
    }
  }
})();
