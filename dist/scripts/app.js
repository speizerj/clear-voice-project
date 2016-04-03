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
    console.log(OAuth);
    OAuth.initialize('IYreajhsPgFrHnuo3E8FfKS5hsI');

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

  loadTweets.$inject = ['oauthioService'];

  /**
   * @ngdoc directive
   * @name loadTweets
   * @description  Simple directive for loading tweets from Twitter
   * @requires oauthioService
   * @restrict A
   */
  function loadTweets(oauthioService) {
    return {
      restrict: 'A',
      scope: false,
      link: link
    };

    ////////////////////////

    function link(scope, element, attrs) {

      OAuth.initialize('IYreajhsPgFrHnuo3E8FfKS5hsI');
      OAuth.popup('twitter').then(function(oauthResult) {
        return oauthResult.get('1.1/search/tweets.json?q=weather&geocode=37.781157,-122.398720,10mi');
      }).then(function(data) {
        console.log(data);
      }).fail(function(err) {
        console.error(err);
      });

      // oauthioService.OAuth().then(function(OAuth) {
      //   OAuth.initialize('IYreajhsPgFrHnuo3E8FfKS5hsI');


      // });
      

    }

  }


})();
