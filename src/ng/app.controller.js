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