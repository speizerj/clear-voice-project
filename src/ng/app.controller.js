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