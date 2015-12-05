'use strict';

describe('Controller: AboutCtrl', function() {

  // load the controller's module
  beforeEach(module('musetrapApp'));

  var AboutCtrl, $translate, $scope, $rootScope;

  beforeEach(inject(function($controller, _$rootScope_, _$translate_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $translate = _$translate_;

    AboutCtrl = $controller('AboutCtrl', {
      $scope: $scope
    });
  }));

  it('should return the correct content depending on the language in use', function() {
    expect($scope.getAboutContent()).toEqual("views/about_en.html");
    $translate.use('es');
    expect($scope.getAboutContent()).toEqual("views/about_es.html");
  });
});
