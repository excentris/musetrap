'use strict';

/**
 * @ngdoc service
 * @name musetrapApp.Data
 * @description service dedicated to data retrieval
 */
angular.module('musetrapApp')
  .factory('Data', ['$http', '$q', function($http, $q) {

    /**
     * Retrieves ingredient_bundles data for the specified bundleIds
     * @param bundleIds an array with bundle ids
     * @return an array of promises, one for each requested bundle
     */
    function getIngredients(bundleIds) {
      var promises = [];
      angular.forEach(bundleIds, function(bundleId) {
        promises.push($http.get('data/ingredient_bundles/' + bundleId + '.json'));
      });

      return $q.all(promises);
    }

    /**
     * Retrieves the recipes file
     * @return a promise for the recipes
     */
    function getRecipes() {
      return $http.get('data/recipes.json');
    }

    /**
     * Retrieves metadata info file
     * @return a promise for the metadata
     */
    var metadataPromise;
    function getMetadata() {
      if (!metadataPromise) {
        metadataPromise = $http.get('metadata.json');
      }
      return metadataPromise;
    }

    // Public API here
    return {
      getIngredients: getIngredients,
      getRecipes: getRecipes,
      getMetadata: getMetadata
    };
  }]);
