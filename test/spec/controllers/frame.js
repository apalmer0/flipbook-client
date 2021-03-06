'use strict';

describe('Controller: FrameCtrl', function () {

  // load the controller's module
  beforeEach(module('flipbookApp'));

  var FrameCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FrameCtrl = $controller('FrameCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FrameCtrl.awesomeThings.length).toBe(3);
  });
});
