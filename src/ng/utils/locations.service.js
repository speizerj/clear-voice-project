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
        {state: 'CA', city: 'Truckee', lat: '39.313772', lon: '-120.144643', rad: '20mi'},
        {state: 'CA', city: 'Mammoth_Lakes', lat: '37.648318', lon: '-118.983759', rad: '50mi'},
        {state: 'CA', city: 'Big_Bear_Lake', lat: '34.243327', lon: '-116.892307', rad: '20mi'}
      ]
    };

  }


})();
