(function() {
  'use strict';

  angular
    .module('app.ui')
    .directive('forecastDay', forecastDay);

  function forecastDay() {
    return {
      restrict: 'E',
      scope: {
        forecast: '=',
        location: '='
      },
      replace: true,
      templateUrl: './src/ng/ui/forecast-day/forecast-day.html'
    }
  }
})();