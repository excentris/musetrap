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
  }));

  it('Should display a notification error', function() {
    NotificationFactory.error('error');
    expect(toastr.error).toHaveBeenCalled();
  });
});
