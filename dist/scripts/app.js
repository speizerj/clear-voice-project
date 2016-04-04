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

  AppController.$inject = ['locationsService', '$http'];

  function AppController(locationsService, $http) {
    var vm = this;
    vm.locations = locationsService.list;
    vm.locationIndex = '0';
    vm.location = vm.locations[vm.locationIndex];
    vm.getData = getData;

    vm.callback = function(data) {
      console.log(data);
    }

    init();

    ///////////////////
    
    /**
     * PUBLIC FUNCTIONS
     */
    
    function getData() {
      vm.location = vm.locations[vm.locationIndex];
      oauth();
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
    .module("app.utils")
    .factory("locationsService", locationsService);

  /**
   * @ngdoc service
   * @name locationsService
   * @description  Factory for holding our location data
   */
  function locationsService() {
    return {
      list: [
        {state: 'CA', city: 'Truckee', lat: '39.313772', lon: '-120.144643', rad: '20mi'},
        {state: 'CA', city: 'Mammoth_Lakes', lat: '37.648318', lon: '-118.983759', rad: '50mi'},
        {state: 'CA', city: 'Big_Bear_Lake', lat: '34.243327', lon: '-116.892307', rad: '20mi'}
      ]
    };

  }


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
