'use strict';

describe('Controller: CreateimageCtrl', function () {

  // load the controller's module
  beforeEach(module('flipbookApp'));

  var CreateimageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateimageCtrl = $controller('CreateimageCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreateimageCtrl.awesomeThings.length).toBe(3);
  });
});
