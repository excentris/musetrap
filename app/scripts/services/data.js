'use strict';

/**
 * @ngdoc service
 * @name musetrapApp.Data
 * @description service dedicated to data retrieval
 */
angular.module('musetrapApp')
  .factory('Data', ['$http', '$q', function($http, $q) {

    /**
     * Retrieves ingredients data for the specified bundleIds
     * @param bundleIds an array with bundle ids
     * @return an array of promises, one for each requested bundle
     */
    function getIngredients(bundleIds) {
      var promises = [];
      angular.forEach(bundleIds, function(bundleId) {
        promises.push($http.get('data/ingredients/' + bundleId + '.json'));
      });

      return $q.all(promises);
    }

    /**
     * Retrieves a recipe (i.e. the recipe definition)
     * @param  recipeId the string with the recipe id
     * @return a promise for the requested recipe
     */
    function getRecipe(recipeId) {
      return $http.get('data/recipes/' + recipeId + '.json');
    }

    /**
     * Retrieves metadata info file
     * @return a promise for the metadata
     */
    function getMetadata() {
      return $http.get('metadata.json');
    }

    // Public API here
    return {
      getIngredients: getIngredients,
      getRecipe: getRecipe,
      getMetadata: getMetadata
    };
  }]);
