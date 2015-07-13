'use strict';

describe('Controller: IngredientCtrl', function() {

  // load the controller's module
  beforeEach(module('musetrapApp'));

  var IngredientCtrl,
    $scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    $scope = $rootScope.$new();
    IngredientCtrl = $controller('IngredientCtrl', {
      $scope: $scope
        // place here mocked dependencies
    });
  }));

  it('should initially have no ingredients', function() {
    expect($scope.ingredients.length).toBe(0);
  });

  it('should attach a list of ingredients to the scope when calling getRecipe', function() {
    $scope.getRecipe();
    expect($scope.ingredients.length).toBe(3);
  });
});
