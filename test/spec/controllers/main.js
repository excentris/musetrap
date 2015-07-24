'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('musetrapApp'));

  var MainCtrl, $scope, $rootScope, $q, queryDeferred;
  var expectedResponse = [{
    "data": [{
      "name": "Sword"
    }, {
      "name": "Axe"
    }, {
      "name": "Crossbow"
    }, {
      "name": "Pistol"
    }]
  }];

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, _$q_, _$rootScope_) {
    var mockedDataService = {
      getIngredients: function() {
        queryDeferred = $q.defer();
        return queryDeferred.promise;
      }
    };

    $q = _$q_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    MainCtrl = $controller('MainCtrl', {
      $scope: $scope,
      Data: mockedDataService
    });
  }));

  it('should initially have no ingredients', function() {
    expect($scope.ingredients.length).toBe(0);
  });

  it('should have 1 ingredient after sampling the response on getRecipe', function() {
    $scope.getRecipe();
    // resolve the deferred with a response. 'then' is not yet called.
    queryDeferred.resolve(expectedResponse);
    // propagate promise resolution to 'then'
    $rootScope.$apply();
    expect($scope.ingredients.length).toBe(1);
  });
});
