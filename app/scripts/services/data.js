'use strict';

/**
 * @ngdoc service
 * @name musetrapApp.Data
 * @description
 * # Data
 * Factory in the musetrapApp.
 */
angular.module('musetrapApp')
  .factory('Data', ['$http', function($http) {

    function getIngredients() {
      return $http.get('data/ingredients.json');
    }

    // Public API here
    return {
      getIngredients: getIngredients
    };
  }]);
