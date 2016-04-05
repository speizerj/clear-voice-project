"use strict";

describe("state service", function() {

  beforeEach(module("app.utils"));

  it("should return the correct codes", inject(function(stateService) {
    expect(stateService.code['California']).toEqual('CA');
    expect(stateService.code['Maine']).toEqual('ME');
    expect(stateService.code['District of Columbia']).toEqual('DC');
  }));

});