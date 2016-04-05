(function() {
  'use strict';

  angular
    .module('app.ui')
    .directive('forecastDay', forecastDay);

  /**
   * @name forecastDay
   * @description  Today's forecast
   * @param {obj} forecast The forecast object passed in from AppController
   * @restrict E
   * @ngdoc directive
   */
  function forecastDay() {
    return {
      restrict: 'E',
      scope: {
        forecast: '='
      },
      replace: true,
      templateUrl: './src/ng/ui/forecast-day/forecast-day.html'
    }
  }
})();