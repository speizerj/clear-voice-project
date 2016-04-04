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
      getWeather();
    }

    function findLocation(input, timeout) {
      return $http.jsonp('http://autocomplete.wunderground.com/aq?c=US&cb=JSON_CALLBACK&query=' + input, {timeout: timeout}).success(function(data) {
        return data;
      }).error(function(err) {
        console.log(err);
      });
    }

    function locationCallback(data) {
      var location = data.originalObject.name.split(', ');
      console.log(location);
      vm.location = {
        "city": location[0],
        "state": stateService.code[location[1]],
        "lat": data.originalObject.lat,
        "lon": data.originalObject.lon
      }
      vm.getData();
    }   


    /**
     * PRIVATE FUNCTIONS
     */
    
    function init() {
      OAuth.initialize('IYreajhsPgFrHnuo3E8FfKS5hsI');


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
      // var location = vm.locations[vm.locationIndex];
      // var geocode = location.lat + ',' + location.lon + ',' + location.rad;
      // res.get('1.1/search/tweets.json?q=weather&geocode=' + geocode).then(function(data) {
      //   console.log(data);
      // })
    }

    function getWeather() {
      var city = vm.location.city.replace(/\s/g, '_');
      $http.get('http://api.wunderground.com/api/f0980a3218b1a66d/forecast/q/' + vm.location.state + '/' + city + '.json').success(function(data) {
        vm.forecast = data.forecast.simpleforecast.forecastday;
        console.log(vm.forecast);
      }).error(function(err) {
        console.log(err);
      })
    }

  }
})();