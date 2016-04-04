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
    $httpProvider.defaults.withCredentials = true;
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

  AppController.$inject = ['stateService', '$http'];

  function AppController(stateService, $http) {
    var vm = this;
    vm.getData = getData;
    vm.locationCallback = locationCallback;
    vm.findLocation = findLocation;

    init();

    ///////////////////
    
    /**
     * PUBLIC FUNCTIONS
     */
    
    function getData() {
      oauth();
    }

    function findLocation(input, timeout) {
      return $http.jsonp('http://autocomplete.wunderground.com/aq?c=US&cb=JSON_CALLBACK&query=' + input, {timeout: timeout}).success(function(data) {
        return data;
      }).error(function(err) {
        console.log(err);
      });
    }

    function locationCallback(data) {
      var location = data.originalObject.name.split(',');
      vm.location = {
        "city": location[0],
        "state": stateService.code[location[1]],
        "lat": data.originalObject.lat,
        "lon": data.originalObject.lon
      }
      console.log(vm.location);
    }   


    /**
     * PRIVATE FUNCTIONS
     */
    
    function init() {
      OAuth.initialize('IYreajhsPgFrHnuo3E8FfKS5hsI');
      vm.getData();


      // OAuth.popup('twitter').then(function(oauthResult) {
      //   return oauthResult.get('1.1/search/tweets.json?q=weather&geocode=37.781157,-122.398720,10mi');

    }

    function oauth() {
      //if user twitter credentials are not cached, reauth
      var oauth = OAuth.create('twitter');

      if (!oauth) {
        OAuth.popup('twitter', {cache: true}).done(function(res) {
          getTweets(res);
        }).fail(function(err) {
          console.log(err);
        })
      //otherwise just use the cached oauth object
      } else {
        getTweets(oauth);
      }

    }

    function getTweets(res) {
      var location = vm.locations[vm.locationIndex];
      var geocode = location.lat + ',' + location.lon + ',' + location.rad;
      res.get('1.1/search/tweets.json?q=weather&geocode=' + geocode).then(function(data) {
        console.log(data);
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
    .factory('oauthioService', oauthioService);

  oauthioService.$inject = ['$document', '$rootScope', '$q'];

  /**
   * @name oauthioService
   * @service
   * @description  Simple directive for loading tweets from Twitter
   * @requires $document
   * @requires $rootScope
   * @requires $q
   * 
   */
  function oauthioService($document, $rootScope, $q) {
    

    return {

    }
    // var q = $q.defer();

    // var tag = $document[0].createElement('script');
    // tag.type = 'text/javascript';
    // tag.async = true;
    // tag.src = 'dist/bower_components/oauth-js/dist/oauth.js';
    // tag.onreadystatechange = function () {
    //   if (this.readyState === 'complete') { 
    //     loadOauthio();
    //   } 
    // };
    // tag.onload = loadOauthio;

    // var s = $document[0].getElementsByTagName('body')[0];
    // s.appendChild(tag);

    // function loadOauthio() {
    //   $rootScope.$apply(function() { 
    //     q.resolve(window.OAuth); 
    //   });
    // }

    // return {
    //   OAuth: function() { 
    //     return q.promise; 
    //   }
    // };
    
  }
})();
(function() {
  'use strict';

  angular
    .module('app.utils')
    .filter('prettyName', prettyName);

  function prettyName() {
    return function(val) {
      return val.replace(/_/g, ' ');
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
    .module("app.ui")
    .directive("loadTweets", loadTweets);

  loadTweets.$inject = ['locationsService', '$http'];

  /**
   * @ngdoc directive
   * @name loadTweets
   * @description  Simple directive for loading tweets from Twitter
   * @requires locationsService
   * @restrict A
   */
  function loadTweets(locationsService, $http) {
    return {
      restrict: 'A',
      scope: false,
      link: link
    };

    ////////////////////////

    function link(scope, element, attrs) {

      var locations = locationsService.list;



      // oauthioService.OAuth().then(function(OAuth) {
      //   OAuth.initialize('IYreajhsPgFrHnuo3E8FfKS5hsI');


      // });
      

    }

  }


})();
