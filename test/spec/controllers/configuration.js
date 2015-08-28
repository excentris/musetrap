'use strict';

describe('Controller: ConfigurationCtrl', function() {

  // load the controller's module
  beforeEach(module('musetrapApp'));

  var ConfigurationCtrl, $scope, $rootScope, $httpBackend;
  // Initialize the controller
  beforeEach(inject(function(_$httpBackend_, $controller, _$rootScope_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('metadata.json').respond({
      "availableBundles": [
        "animals",
        "creatures",
        "plants",
        "weapons"
      ]
    });
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    ConfigurationCtrl = $controller('ConfigurationCtrl', {
      $scope: $scope
    });
  }));

  it('should initially have no modules selected', function() {
    expect($scope.selectedBundles.length).toBe(0);
  });

  it('should initially have four modules available', function() {
    $httpBackend.flush();
    expect($scope.availableBundles.length).toBe(4);
  });

  it('should have 1 selected module after selecting 1 module with an initially empty selection', function() {
    $scope.availableBundles = ['animals', 'weapons'];
    $scope.selectedBundles = [];
    // toggle selection. Only 'animals' module selected
    $scope.toggleBundleSelection('animals');
    expect($scope.selectedBundles).toEqual(['animals']);
    expect($scope.availableBundles.length).toBe(2);
  });

  it('should have 0 selected modules after deselecting the only one selected', function() {
    $scope.availableBundles = ['animals', 'weapons'];
    $scope.selectedBundles = ['weapons'];
    // toggle selection. Deselect 'weapons'
    $scope.toggleBundleSelection('weapons');
    expect($scope.selectedBundles.length).toBe(0);
    expect($scope.availableBundles.length).toBe(2);
  });

  it('should not be possible to select a non available module', function() {
    $scope.availableBundles = ['animals', 'weapons'];
    $scope.selectedBundles = [];
    // toggle selection with a bogus module
    $scope.toggleBundleSelection('bogus');
    expect($scope.selectedBundles.length).toBe(0);
    expect($scope.availableBundles.length).toBe(2);
  });
});
