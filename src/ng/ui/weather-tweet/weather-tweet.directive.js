(function() {
  'use strict';

  angular
    .module('app.ui')
    .directive('weatherTweet', weatherTweet)

  /**
   * @name weatherTweet
   * @description  An individual tweet about the weather
   * @param {obj} tweet The tweet object passed in from AppController
   * @restrict E
   * @ngdoc directive
   */
  function weatherTweet() {
    return {
      restrict: 'E',
      scope: {
        tweet: '='
      },
      replace: true,
      templateUrl: './src/ng/ui/weather-tweet/weather-tweet.html'
    }
  }

})();