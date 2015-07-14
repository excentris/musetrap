'use strict';

describe('Controller: IngredientCtrl', function() {

  // load the controller's module
  beforeEach(module('musetrapApp'));

  var IngredientCtrl,
    $scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('data/ingredients.json').respond([{
      "name": "Aphrodite",
      "description": "Goddess of love, beauty, desire, sex and pleasure."
    }, {
      "name": "Apollo",
      "description": "God of music, arts, knowledge, healing, plague, prophecy, poetry, manly beauty, archery, and the sun."
    }, {
      "name": "Zeus",
      "description": "King and father of the gods, the ruler of Mount Olympus and the god of the sky, weather, thunder, lightning, law, order, and justice."
    }]);

    $scope = $rootScope.$new();
    IngredientCtrl = $controller('IngredientCtrl', {
      $scope: $scope
    });
  }));

  it('should initially have no ingredients', function() {
    expect($scope.ingredients.length).toBe(0);
  });

  it('should attach a list of ingredients to the scope when calling getRecipe', function() {
    $scope.getRecipe();
    $httpBackend.flush();
    expect($scope.ingredients.length).toBe(3);
  });
});
