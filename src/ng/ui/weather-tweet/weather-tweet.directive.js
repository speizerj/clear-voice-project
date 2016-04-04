(function() {
  'use strict';

  angular
    .module('app.ui')
    .directive('weatherTweet', weatherTweet)

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