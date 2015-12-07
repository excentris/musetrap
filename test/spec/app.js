'use strict';

describe('App: Testing routeProvider', function() {

  // load the service's module
  beforeEach(module('musetrapApp'));

  it('should correctly use the configured routes', function() {
    inject(function($route, $location, $rootScope, $httpBackend) {
      // swallow i18n calls
      $httpBackend.when('GET', /i18n/).respond({});

      expect($route.current).toBeUndefined();
      $httpBackend.expectGET('views/main.html').respond(200);
      $location.path('/');
      $rootScope.$digest();

      expect($route.current.templateUrl).toBe('views/main.html');
      expect($route.current.controller).toBe('MainCtrl');

      $httpBackend.expectGET('views/about.html').respond(200);
      $location.path('/about');
      $rootScope.$digest();

      expect($route.current.templateUrl).toBe('views/about.html');
      expect($route.current.controller).toBe('AboutCtrl');

      $httpBackend.expectGET('views/main.html').respond(200);
      $location.path('/otherwise');
      $rootScope.$digest();

      expect($location.path()).toBe('/');
      expect($route.current.templateUrl).toEqual('views/main.html');
      expect($route.current.controller).toBe('MainCtrl');
    });
  });
});
