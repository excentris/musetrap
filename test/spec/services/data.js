'use strict';

describe('Service: Data', function() {

  // load the service's module
  beforeEach(module('musetrapApp'));

  // instantiate service
  var Data, $httpBackend, NotificationFactory;
  beforeEach(inject(function(_Data_, _$httpBackend_, _NotificationFactory_) {
    $httpBackend = _$httpBackend_;
    Data = _Data_;
    NotificationFactory = _NotificationFactory_;

    // swallow i18n calls
    $httpBackend.when('GET', /i18n/).respond({});

    spyOn(NotificationFactory, 'error');
  }));

  it('should display an error when getAvailableRecipes fails', function() {
    $httpBackend.when('GET', 'data/recipes.json').respond(401, '');
    Data.getAvailableRecipes();
    $httpBackend.flush();
    expect(NotificationFactory.error).toHaveBeenCalled();
  });

  it('should display an error when getAvailableBundles fails', function() {
    $httpBackend.when('GET', 'metadata.json').respond(401, '');
    Data.getAvailableBundles();
    $httpBackend.flush();
    expect(NotificationFactory.error).toHaveBeenCalled();
  });

  it('should display an error when getAvailableBundles fails', function() {
    $httpBackend.when('GET', 'metadata.json').respond(401, '');
    Data.getAvailableLanguages();
    $httpBackend.flush();
    expect(NotificationFactory.error).toHaveBeenCalled();
  });
});
