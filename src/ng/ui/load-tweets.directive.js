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
