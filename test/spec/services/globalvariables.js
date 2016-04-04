'use strict';

describe('Service: globalVariables', function () {

  // load the service's module
  beforeEach(module('flipbookApp'));

  // instantiate service
  var globalVariables;
  beforeEach(inject(function (_globalVariables_) {
    globalVariables = _globalVariables_;
  }));

  it('should do something', function () {
    expect(!!globalVariables).toBe(true);
  });

});
