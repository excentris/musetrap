'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('musetrapApp'));

  var MainCtrl,
    $scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    $scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: $scope
    });
  }));

  it('should initially have no ingredients', function() {
    expect($scope.ingredients.length).toBe(0);
  });
});
