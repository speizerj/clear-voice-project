"use strict";

describe("ordinal suffix filter", function () {

  beforeEach(module("app.utils"));

  it("should return values with correct suffixes", inject(function(ordinalSuffixFilter) {
    expect(ordinalSuffixFilter(1)).toEqual('1st');
    expect(ordinalSuffixFilter(2)).toEqual('2nd');
    expect(ordinalSuffixFilter(3)).toEqual('3rd');
    expect(ordinalSuffixFilter(4)).toEqual('4th');
    expect(ordinalSuffixFilter(11)).toEqual('11th');
    expect(ordinalSuffixFilter(13)).toEqual('13th');
    expect(ordinalSuffixFilter(22)).toEqual('22nd');
    expect(ordinalSuffixFilter(31)).toEqual('31st');
  }))

});