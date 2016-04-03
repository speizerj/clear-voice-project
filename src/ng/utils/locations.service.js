(function() {
  'use strict';

  angular
    .module("app.utils")
    .factory("locationsService", locationsService);

  /**
   * @ngdoc service
   * @name locationsService
   * @description  Factory for holding our location data
   */
  function locationsService() {
    return {
      list: [
        ['CA', 'Truckee', '39.313772', '-120.144643'],
        ['CA', 'Mammoth_Lakes', '37.648318', '-118.983759'],
        ['CA', 'Big_Bear_Lake', '34.243327', '-116.892307']
      ]
    };

  }


})();
