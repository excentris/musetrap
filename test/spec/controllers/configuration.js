'use strict';

describe('Controller: ConfigurationCtrl', function() {

  // load the controller's module
  beforeEach(module('musetrapApp'));

  var ConfigurationCtrl, $scope, $rootScope, $httpBackend, $translatePartialLoader;

  // Initialize the controller
  beforeEach(inject(function(_$httpBackend_, $controller, _$rootScope_, _$translatePartialLoader_) {
    $httpBackend = _$httpBackend_;
    $translatePartialLoader = _$translatePartialLoader_;

    // swallow i18n calls
    $httpBackend.when('GET', /i18n/).respond({});

    $httpBackend.when('GET', 'metadata.json').respond({
      "availableBundles": [
        "animal_traits",
        "animals",
        "creatures",
        "plants",
        "transportation",
        "weapons"
      ],
      "availableLanguages": [
        "en",
        "es"
      ]
    });

    $httpBackend.when('GET', 'data/recipes.json').respond(
      [{
        "id": "humanoid_creature",
        "ingredient_bundles": ["creatures", "weapons"]
      }, {
        "id": "animal_warrior",
        "ingredient_bundles": ["animals", "weapons"]
      }]
    );

    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    ConfigurationCtrl = $controller('ConfigurationCtrl', {
      $scope: $scope
    });
  }));

  it('should initially have two recipes available', function() {
    $httpBackend.flush();
    expect($scope.availableRecipes.length).toBe(2);
  });

  it('should initially have three registered translation parts', function() {
    expect($translatePartialLoader.getRegisteredParts()).toEqual(['app/ui', 'recipes', 'ingredient_bundles']);
  });

  it('should have two bundles selected when selecting humanoid_creature recipe', function() {
    $scope.changeSelectedRecipe({
      "name": "Creature",
      "description": "Some kind of creature",
      "ingredient_bundles": ["creatures", "weapons"]
    });
    expect($scope.selectedBundles).toEqual(['creatures', 'weapons']);
  });

  it('should reset the selectedBundles and selectedRecipeDescription when clearing the recipe selector', function() {
    $scope.selectedRecipe = {};
    $scope.changeSelectedRecipe();
    expect($scope.selectedBundles).toEqual([]);
    expect($scope.selectedRecipe).toEqual({});
  });

  it('should initially have no modules selected', function() {
    expect($scope.selectedBundles.length).toBe(0);
  });

  it('should initially have "normal" as mode', function() {
    expect($scope.mode).toEqual('normal');
  });

  it('should initially have six modules available', function() {
    $httpBackend.flush();
    expect($scope.availableBundles.length).toBe(6);
  });

  it('should correctly register translation parts for selected bundles', function() {
    $scope.selectedBundles = ['animals'];
    // apply changes for the $scope.$watchCollection to be triggered
    $scope.$apply();
    // the animals part should have been added to the registered parts
    expect($translatePartialLoader.getRegisteredParts()).toEqual(['app/ui', 'recipes', 'ingredient_bundles', 'ingredient_bundles/animals']);
  });

  it('should correctly toggle the mode', function() {
    $scope.mode = 'normal';
    $scope.toggleMode();
    expect($scope.mode).toEqual('tweak');
    $scope.toggleMode();
    expect($scope.mode).toEqual('normal');
  });
});
