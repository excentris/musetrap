'use strict';

describe('Controller: FeedbackCtrl', function() {

  // load the controller's module
  beforeEach(module('musetrapApp'));

  // instantiate service
  var FeedbackCtrl, $scope, $httpBackend, NotificationFactory;
  beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _NotificationFactory_) {
    $scope = $rootScope.$new();
    FeedbackCtrl = $controller('FeedbackCtrl', {
      $scope: $scope
    });
    $httpBackend = _$httpBackend_;
    NotificationFactory = _NotificationFactory_;

    // swallow i18n calls
    $httpBackend.when('GET', /i18n/).respond({});

    spyOn(NotificationFactory, 'success');
    spyOn(NotificationFactory, 'error');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should display a success message when submitting a valid form', function() {
    $httpBackend.expectPOST("http://formspree.io/netrunner+musetrap@gmail.com").respond({});
    $scope.processForm(true);
    $httpBackend.flush();
    expect(NotificationFactory.success).toHaveBeenCalled();
  });

  it('should display an error when submitting the form fails', function() {
    $httpBackend.when('POST', "http://formspree.io/netrunner+musetrap@gmail.com").respond(401, '');
    $scope.processForm(true);
    $httpBackend.flush();
    expect(NotificationFactory.error).toHaveBeenCalled();
  });

  it('should display an error message when submitting an invalid form', function() {
    $scope.processForm(false);
    expect($scope.submittedForm).toBe(true);
    expect(NotificationFactory.error).toHaveBeenCalled();
  });
});
