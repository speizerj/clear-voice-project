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
