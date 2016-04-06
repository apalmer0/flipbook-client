'use strict';

describe('Directive: frame', function () {

  // load the directive's module
  beforeEach(module('flipbookApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<frame></frame>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the frame directive');
  }));
});
