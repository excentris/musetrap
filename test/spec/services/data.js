'use strict';

describe('Service: DataFactory', function() {

  // load the service's module
  beforeEach(module('musetrapApp'));

  // instantiate service
  var DataFactory, $httpBackend, NotificationFactory;
  beforeEach(inject(function(_DataFactory_, _$httpBackend_, _NotificationFactory_) {
    $httpBackend = _$httpBackend_;
    DataFactory = _DataFactory_;
    NotificationFactory = _NotificationFactory_;

    // swallow i18n calls
    $httpBackend.when('GET', /i18n/).respond({});

    spyOn(NotificationFactory, 'error');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should display an error when getAvailableRecipes fails', function() {
    $httpBackend.when('GET', 'data/recipes.json').respond(401, '');
    DataFactory.getAvailableRecipes();
    $httpBackend.flush();
    expect(NotificationFactory.error).toHaveBeenCalled();
  });

  it('should display an error when getAvailableBundles fails', function() {
    $httpBackend.when('GET', 'metadata.json').respond(401, '');
    DataFactory.getAvailableBundles();
    $httpBackend.flush();
    expect(NotificationFactory.error).toHaveBeenCalled();
  });

  it('should display an error when getAvailableBundles fails', function() {
    $httpBackend.when('GET', 'metadata.json').respond(401, '');
    DataFactory.getAvailableLanguages();
    $httpBackend.flush();
    expect(NotificationFactory.error).toHaveBeenCalled();
  });

  it('should get the "animals" and "creatures" bundle when calling getIngredients with those bundleIds', function() {
    $httpBackend.expectGET('data/ingredient_bundles/animals.json').respond({});
    $httpBackend.expectGET('data/ingredient_bundles/creatures.json').respond({});
    DataFactory.getIngredients(['animals', 'creatures']);
    $httpBackend.flush();
  });
});
