'use strict';

describe('Service: authenticationSvc', function () {

  // load the service's module
  beforeEach(module('flipbookApp'));

  // instantiate service
  var authenticationSvc;
  beforeEach(inject(function (_authenticationSvc_) {
    authenticationSvc = _authenticationSvc_;
  }));

  it('should do something', function () {
    expect(!!authenticationSvc).toBe(true);
  });

});
