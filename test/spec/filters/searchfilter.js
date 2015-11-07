'use strict';

describe('Filter: searchFilter', function() {

  // load the filter's module
  beforeEach(module('musetrapApp'));

  var searchFilter, $scope, $rootScope;
  beforeEach(inject(function($filter, _$rootScope_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $scope.availableRecipes = [{
      "name": "Humanoid creature",
      "description": "A humanoid is something that has an appearance resembling a human being.",
      "ingredients": ["creatures", "weapons"]
    }, {
      "name": "Creature",
      "description": "Some kind of creature",
      "ingredients": ["animals", "plants"]
    }];
    searchFilter = $filter('searchFilter');
  }));

  it('searching for "humanoid" should return the "Humanoid creature" recipe', function() {
    var search = {
      name: 'humanoid',
      description: 'humanoid',
      ingredients: 'humanoid'
    };
    expect(searchFilter($scope.availableRecipes, search)[0].name).toBe('Humanoid creature');
  });

});
