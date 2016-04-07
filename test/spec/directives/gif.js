'use strict';

describe('Directive: gif', function () {

  // load the directive's module
  beforeEach(module('flipbookApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<gif></gif>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the gif directive');
  }));
});
