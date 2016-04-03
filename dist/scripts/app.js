(function () {
  'use strict';

  angular.module('app', [
    'app.ui',
    'app.utils'
  ]);

})();


(function () {
  'use strict';

  angular
    .module('app')
    .config(appConfig);

  appConfig.$inject = [];

  function appConfig() {
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

    init();

    ///////////////////
    
    function init() {
      OAuth.initialize('IYreajhsPgFrHnuo3E8FfKS5hsI');

      if (User.isLogged()) {
        vm.user = User.getIdentity().data;
      } else {
        OAuth.popup('twitter').done(function(res) {
          res.me().then(function(me) {
            res.email = me.alias + "@gmail.com";
            User.signup(res);
          })
        }).fail(function(err) {
            //todo with err
        });
      }

      // OAuth.popup('twitter').then(function(oauthResult) {
      //   return oauthResult.get('1.1/search/tweets.json?q=weather&geocode=37.781157,-122.398720,10mi');

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
        ['CA', 'Truckee', '39.313772', '-120.144643'],
        ['CA', 'Mammoth_Lakes', '37.648318', '-118.983759'],
        ['CA', 'Big_Bear_Lake', '34.243327', '-116.892307']
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
