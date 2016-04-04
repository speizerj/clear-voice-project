(function() {
  'use strict';

  angular
    .module('app.utils')
    .filter('prettyName', prettyName);

  function prettyName() {
    return function(val) {
      return val.replace(/_/g, ' ');
    }
  }
})();