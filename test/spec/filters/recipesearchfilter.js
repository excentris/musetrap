'use strict';

describe('Filter: recipeSearchFilter', function() {

  // load the filter's module
  beforeEach(module('musetrapApp'));

  var recipeSearchFilter, $scope, $rootScope;
  beforeEach(inject(function($filter, _$rootScope_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $scope.availableRecipes = [{
      "id": "humanoid_creature",
      "ingredients": ["creatures", "weapons"]
    }, {
      "id": "animal_warrior",
      "ingredients": ["animals", "weapons"]
    }];
    recipeSearchFilter = $filter('recipeSearchFilter');
  }));

  it('searching for "humanoid" should return the "Humanoid creature" recipe', function() {
    expect(recipeSearchFilter($scope.availableRecipes, 'humanoid')[0].id).toBe('humanoid_creature');
  });

});
