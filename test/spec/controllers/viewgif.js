'use strict';

describe('Controller: ViewgifCtrl', function () {

  // load the controller's module
  beforeEach(module('flipbookApp'));

  var ViewgifCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewgifCtrl = $controller('ViewgifCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ViewgifCtrl.awesomeThings.length).toBe(3);
  });
});
