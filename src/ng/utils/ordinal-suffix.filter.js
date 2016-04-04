(function() {
  'use strict';

  angular
    .module('app.utils')
    .filter('ordinalSuffix', ordinalSuffix);

  function ordinalSuffix() {
    return function (val) {
      var suffix = ["th","st","nd","rd"];
      var v = val % 100;
      return val + (suffix[(v-20) % 10]||suffix[v]||suffix[0]);
    }
  }
})();