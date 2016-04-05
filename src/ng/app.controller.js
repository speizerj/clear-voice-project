(function() {
  'use strict';

  angular
    .module('app')
    .controller('AppController', AppController);

  AppController.$inject = ['stateService', '$http', '$scope'];

  /**
   * @name AppController
   * @ngdoc controller
   * @description  The main controller for the app
   * @requires  stateService
   * @requires  $http
   * @requires  $scope
   */
  function AppController(stateService, $http, $scope) {
    var vm = this;
    vm.getData = getData;
    vm.locationCallback = locationCallback;
    vm.findLocation = findLocation;
    vm.connectTwitter = connectTwitter;
    vm.disc = disc;
    vm.weatherTweets = true;

    init();

    ///////////////////
    
    /**
     * PUBLIC FUNCTIONS
     */
    
    function getData() {
      getWeather();
      if (vm.connected) {
        getTweets(vm.oauth);
      }
    }

    function findLocation(input, timeout) {
      return $http.jsonp('http://autocomplete.wunderground.com/aq?c=US&cb=JSON_CALLBACK&query=' + input, {timeout: timeout}).success(function(data) {
        return data;
      }).error(function(err) {
        console.log(err);
      });
    }

    function locationCallback(data) {
      if (!!!data) {
        return;
      }
      var location = data.originalObject.name.split(', ');
      vm.location = {
        "city": location[0],
        "state": stateService.code[location[1]],
        "lat": data.originalObject.lat,
        "lon": data.originalObject.lon
      }
      vm.getData();
    }   

    function connectTwitter() {
      //if user twitter credentials are not cached, reauth

      if (!vm.connected) {
        OAuth.popup('twitter', {cache: true}).done(function(res) {
          vm.connected = true;
          $scope.$apply();
          getTweets(res);
        }).fail(function(err) {
          console.log(err);
        })
      //otherwise just use the cached oauth object
      } else {
        getTweets(vm.oauth);
      }

    }

    //used mainly for dev but kept in for posterity
    function disc() {
      vm.oauth = null;
      vm.connected = false;
      OAuth.clearCache();
    }


    /**
     * PRIVATE FUNCTIONS
     */
    
    function init() {
      OAuth.initialize('IYreajhsPgFrHnuo3E8FfKS5hsI');
      vm.oauth = OAuth.create('twitter');
      vm.connected = vm.oauth ? true : false;
    }

    function getTweets(res) {
      var location = vm.location;
      var geocode = location.lat + ',' + location.lon + ',20mi';
      res.get('1.1/search/tweets.json?q=weather&geocode=' + geocode).then(function(data) {
        if (!data.statuses.length) {
          vm.weatherTweets = false;
        } else {
          vm.weatherTweets = data.statuses;
        }
        $scope.$apply();
      })
    }

    function getWeather() {
      var city = vm.location.city.replace(/\s/g, '_');
      $http.get('http://api.wunderground.com/api/f0980a3218b1a66d/forecast/q/' + vm.location.state + '/' + city + '.json').success(function(data) {
        vm.forecast = data.forecast.simpleforecast.forecastday[0];
      }).error(function(err) {
        console.log(err);
      })
    }

  }
})();