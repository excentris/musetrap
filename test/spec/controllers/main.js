'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('musetrapApp'));

  var MainCtrl, $scope, $rootScope, $q, queryDeferred, $httpBackend, NotificationFactory;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, _$q_, _$rootScope_, _NotificationFactory_) {
    $httpBackend = _$httpBackend_;
    NotificationFactory = _NotificationFactory_;

    // swallow i18n calls
    $httpBackend.when('GET', /i18n/).respond({});

    var mockedDataService = {
      getIngredients: function() {
        queryDeferred = $q.defer();
        return queryDeferred.promise;
      }
    };

    $q = _$q_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    spyOn(NotificationFactory, 'error');

    MainCtrl = $controller('MainCtrl', {
      $scope: $scope,
      DataFactory: mockedDataService
    });
  }));

  it('should initially have no ingredients', function() {
    expect($scope.recipeResults.length).toBe(0);
  });

  it('should have 1 ingredient after sampling the response on createRecipe', function() {
    $scope.createRecipe();
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
    // resolve the deferred with a response. 'then' is not yet called.
    queryDeferred.resolve(expectedResponse);
    // propagate promise resolution to 'then'
    $rootScope.$apply();
    expect($scope.recipeResults.length).toBe(1);
  });

  it('should display an error when getIngredients fails when createRecipe is called', function() {
    $scope.createRecipe();
    // resolve the deferred with a response. 'then' is not yet called.
    queryDeferred.reject();
    // propagate promise resolution to 'then'
    $rootScope.$apply();
    expect(NotificationFactory.error).toHaveBeenCalled();
  });
});
