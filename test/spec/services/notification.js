'use strict';

describe('Service: NotificationFactory', function () {

  // load the service's module
  beforeEach(module('musetrapApp'));

  // instantiate service
  var NotificationFactory, toastr;
  beforeEach(inject(function (_NotificationFactory_, _toastr_) {
    NotificationFactory = _NotificationFactory_;
    toastr = _toastr_;
    spyOn(toastr, 'error');
    spyOn(toastr, 'success');
  }));

  it('should display a notification error', function() {
    NotificationFactory.error('error');
    expect(toastr.error).toHaveBeenCalled();
  });

  it('should display a notification success', function() {
    NotificationFactory.success('success');
    expect(toastr.success).toHaveBeenCalled();
  });
});
