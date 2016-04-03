(function() {
  'use strict';

  angular
    .module('app')
    .controller('AppController', AppController);

  AppController.$inject = ['locationsService', '$http'];

  function AppController(locationsService, $http) {
    var vm = this;
    vm.locations = locationsService.list;

    init();

    ///////////////////
    
    function init() {
      OAuth.initialize('IYreajhsPgFrHnuo3E8FfKS5hsI');

      if (User.isLogged()) {
        vm.user = User.getIdentity().data;
      } else {
        OAuth.popup('twitter').done(function(res) {
          res.me().then(function(me) {
            res.email = me.alias + "@gmail.com";
            User.signup(res);
          })
        }).fail(function(err) {
            //todo with err
        });
      }

      // OAuth.popup('twitter').then(function(oauthResult) {
      //   return oauthResult.get('1.1/search/tweets.json?q=weather&geocode=37.781157,-122.398720,10mi');

    }

  }
})();