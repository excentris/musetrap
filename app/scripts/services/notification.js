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

    return NotificationFactory;
  }]);
