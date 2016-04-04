(function () {
  'use strict';

  angular.module('app', [
    'angucomplete-alt',
    'app.ui',
    'app.utils'
  ]);

})();


(function () {
  'use strict';

  angular
    .module('app')
    .config(appConfig);

  appConfig.$inject = ['$httpProvider'];

  function appConfig($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  }

})();
(function() {
  'use strict';

  angular
    .module('app')
    .controller('AppController', AppController);

  AppController.$inject = ['stateService', '$http', '$scope'];

  function AppController(stateService, $http, $scope) {
    var vm = this;
    vm.getData = getData;
    vm.locationCallback = locationCallback;
    vm.findLocation = findLocation;
    vm.connectTwitter = connectTwitter;
    vm.disc = disc;
    vm.weatherTweets = true;

    init();

    ///////////////////
    
    /**
     * PUBLIC FUNCTIONS
     */
    
    function getData() {
      getWeather();
      if (vm.connected) {
        getTweets(vm.oauth);
      }
    }

    function findLocation(input, timeout) {
      return $http.jsonp('http://autocomplete.wunderground.com/aq?c=US&cb=JSON_CALLBACK&query=' + input, {timeout: timeout}).success(function(data) {
        return data;
      }).error(function(err) {
        console.log(err);
      });
    }

    function locationCallback(data) {
      var location = data.originalObject.name.split(', ');
      vm.location = {
        "city": location[0],
        "state": stateService.code[location[1]],
        "lat": data.originalObject.lat,
        "lon": data.originalObject.lon
      }
      vm.getData();
    }   

    function connectTwitter() {
      //if user twitter credentials are not cached, reauth

      if (!vm.connected) {
        OAuth.popup('twitter', {cache: true}).done(function(res) {
          vm.connected = true;
          $scope.$apply();
          getTweets(res);
        }).fail(function(err) {
          console.log(err);
        })
      //otherwise just use the cached oauth object
      } else {
        getTweets(vm.oauth);
      }

    }

    function disc() {
      vm.oauth = null;
      vm.connected = false;
      OAuth.clearCache();
    }


    /**
     * PRIVATE FUNCTIONS
     */
    
    function init() {
      OAuth.initialize('IYreajhsPgFrHnuo3E8FfKS5hsI');
      vm.oauth = OAuth.create('twitter');
      vm.connected = vm.oauth ? true : false;
    }

    function getTweets(res) {
      var location = vm.location;
      var geocode = location.lat + ',' + location.lon + ',20mi';
      res.get('1.1/search/tweets.json?q=weather&geocode=' + geocode).then(function(data) {
        if (!data.statuses.length) {
          vm.weatherTweets = false;
        } else {
          vm.weatherTweets = data.statuses;
        }
        $scope.$apply();
      })
    }

    function getWeather() {
      var city = vm.location.city.replace(/\s/g, '_');
      $http.get('http://api.wunderground.com/api/f0980a3218b1a66d/forecast/q/' + vm.location.state + '/' + city + '.json').success(function(data) {
        vm.forecast = data.forecast.simpleforecast.forecastday[0];
      }).error(function(err) {
        console.log(err);
      })
    }

  }
})();
(function() {
  'use strict';

  angular.module("app.utils", []);

})();

(function() {
  'use strict';

  angular
    .module('app.utils')
    .filter('ordinalSuffix', ordinalSuffix);

  function ordinalSuffix() {
    return function (val) {
      var suffix = ["th","st","nd","rd"];
      var v = val % 100;
      return val + (suffix[(v-20) % 10]||suffix[v]||suffix[0]);
    }
  }
})();
(function() {
  'use strict';

  angular
    .module("app.utils")
    .factory("stateService", stateService);

  /**
   * @ngdoc service
   * @name stateService
   * @description  Factory for holding our location data
   */
  function stateService() {
    return {
      code: {
        'Alabama': 'AL',
        'Alaska': 'AK',
        'American Samoa': 'AS',
        'Arizona': 'AZ',
        'Arkansas':  'AR',
        'California':  'CA',
        'Colorado':  'CO',
        'Connecticut': 'CT',
        'Delaware':  'DE',
        'District of Columbia': 'DC',
        'Florida': 'FL',
        'Georgia': 'GA',
        'Guam':  'GU',
        'Hawaii': 'HI',
        'Idaho': 'ID',
        'Illinois': 'IL',
        'Indiana': 'IN',
        'Iowa':  'IA',
        'Kansas':  'KS',
        'Kentucky':  'KY',
        'Louisiana': 'LA',
        'Maine': 'ME',
        'Maryland':  'MD',
        'Marshall Islands':  'MH',
        'Massachusetts': 'MA',
        'Michigan':  'MI',
        'Micronesia': 'FM',
        'Minnesota': 'MN',
        'Mississippi': 'MS',
        'Missouri':  'MO',
        'Montana': 'MT',
        'Nebraska':  'NE',
        'Nevada':  'NV',
        'New Hampshire': 'NH',
        'New Jersey':  'NJ',
        'New Mexico':  'NM',
        'New York':  'NY',
        'North Carolina': 'NC',
        'North Dakota':  'ND',
        'Northern Marianas' :  'MP',
        'Ohio' : 'OH',
        'Oklahoma':  'OK',
        'Oregon':  'OR',
        'Palau':   'PW',
        'Pennsylvania':  'PA',
        'Puerto Rico': 'PR',
        'Rhode Island':  'RI',
        'South Carolina':  'SC',
        'South Dakota':  'SD',
        'Tennessee': 'TN',
        'Texas': 'TX',
        'Utah':  'UT',
        'Vermont': 'VT',
        'Virginia':  'VA',
        'Virgin Islands':  'VI',
        'Washington':  'WA',
        'West Virginia': 'WV',
        'Wisconsin': 'WI',
        'Wyoming': 'WY'
      }
    };

  }


})();

(function() {
  'use strict';

  angular.module("app.ui", []);

})();

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