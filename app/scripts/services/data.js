'use strict';

/**
 * @ngdoc service
 * @name musetrapApp.Data
 * @description
 * # Data
 * Factory in the musetrapApp.
 */
angular.module('musetrapApp')
  .factory('Data', function() {

    function getIngredients() {
      return [{
        'name': 'Something',
        'description': 'This is something'
      }, {
        'name': 'Something else',
        'description': 'And this is something else'
      }, {
        'name': 'Whatever',
        'description': 'This is whatever'
      }];
    }

    // Public API here
    return {
      getIngredients: getIngredients
    };
  });
