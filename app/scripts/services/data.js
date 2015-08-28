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
        promises.push($http.get('data/' + bundleId + '.json'));
      });

      return $q.all(promises);
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
      getMetadata: getMetadata
    };
  }]);
