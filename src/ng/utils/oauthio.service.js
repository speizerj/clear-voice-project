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