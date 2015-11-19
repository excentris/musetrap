'use strict';

describe('Controller: FooterCtrl', function() {

  // load the controller's module
  beforeEach(module('musetrapApp'));

  var FooterCtrl, $scope, $rootScope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, _$rootScope_) {
    $httpBackend = _$httpBackend_;

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

    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    FooterCtrl = $controller('FooterCtrl', {
      $scope: $scope
    });
  }));

  it('should initially have two languages available', function() {
    $httpBackend.flush();
    expect($scope.availableLanguages.length).toBe(2);
  });

  it('should have "en" as initially selected language', function() {
    $httpBackend.flush();
    expect($scope.selectedLanguage).toEqual('en');
  });

  it('should have "es" as selectedLanguage when calling changeLanguage(es)', function() {
    $scope.changeLanguage('es');
    expect($scope.selectedLanguage).toEqual('es');
  });

  it('should have "/" as initial location', function() {
    $scope.$on('$locationChangeSuccess', function() {
      expect($scope.location.active).toEqual('/');
    });
  });
});
