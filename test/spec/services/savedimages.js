'use strict';

describe('Service: savedImages', function () {

  // load the service's module
  beforeEach(module('flipbookApp'));

  // instantiate service
  var savedImages;
  beforeEach(inject(function (_savedImages_) {
    savedImages = _savedImages_;
  }));

  it('should do something', function () {
    expect(!!savedImages).toBe(true);
  });

});
