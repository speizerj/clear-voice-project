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
   * @memberOf  utils
   * @ngdoc service
   * @return {obj}            oauth service
   */
  function oauthioService($document, $rootScope, $q) {
    var q = $q.defer();

    var tag = $document[0].createElement('script');
    tag.type = 'text/javascript';
    tag.async = true;
    tag.src = 'dist/bower_components/oauth-js/dist/oauth.js';
    tag.onreadystatechange = function () {
      if (this.readyState === 'complete') { 
        loadOauthio();
      } 
    };
    tag.onload = loadOauthio;

    var s = $document[0].getElementsByTagName('body')[0];
    s.appendChild(tag);

    function loadOauthio() {
      $rootScope.$apply(function() { 
        q.resolve(window.OAuth); 
      });
    }

    return {
      OAuth: function() { 
        return q.promise; 
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

  loadTweets.$inject = ['oauthioService'];

  function loadTweets(oauthioService) {
    oauthioService.OAuth().then(function(OAuth) {
      console.log(OAuth);
    });
  }


})();
