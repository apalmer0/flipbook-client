'use strict';

describe('Service: gif', function () {

  // load the service's module
  beforeEach(module('flipbookApp'));

  // instantiate service
  var gif;
  beforeEach(inject(function (_gif_) {
    gif = _gif_;
  }));

  it('should do something', function () {
    expect(!!gif).toBe(true);
  });

});
