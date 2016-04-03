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
