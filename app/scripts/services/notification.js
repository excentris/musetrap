'use strict';

/**
 * @ngdoc service
 * @name musetrapApp.notification
 * @description
 * # notification
 * Factory in the musetrapApp.
 */
angular.module('musetrapApp')
  .factory('NotificationFactory', ['toastr', function NotificationFactory(toastr) {

    /**
     * Displays an error notification.
     * @param  errorMsg the error message to display.
     */
    NotificationFactory.error = function(errorMsg) {
      toastr.error(errorMsg);
    };

    /**
     * Displays an success notification.
     * @param  successMsg the success message to display.
     */
    NotificationFactory.success = function(successMsg) {
      toastr.success(successMsg);
    };

    return NotificationFactory;
  }]);
