'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('musetrapApp'));

  var MainCtrl,
    $scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    // TODO create a mocked Data service and inject it into the controller
    var mockedDataService = {
      getIngredients: function() {
        // return a promise
      }
    };

    $scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: $scope,
      Data: mockedDataService
    });
  }));

  it('should initially have no ingredients', function() {
    expect($scope.ingredients.length).toBe(0);
  });
});
