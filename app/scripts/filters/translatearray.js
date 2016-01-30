'use strict';

/**
 * @ngdoc filter
 * @name musetrapApp.filter:translateArray
 * @function
 * @description
 * # translateArray
 * Filter in the musetrapApp.
 */
angular.module('musetrapApp')
  .filter('translateArray', ['$translate', function($translate) {
    return function(inputArray) {
      var out = "";
      if (angular.isArray(inputArray)) {
        var i = 0;
        for (i; i < inputArray.length; i++) {
          var element = inputArray[i];
          var elementTranslation = $translate.instant(element);
          out += elementTranslation;
          if (i < inputArray.length - 1) {
            out += ", ";
          }
        }
      }

      return out;
    };
  }]);
