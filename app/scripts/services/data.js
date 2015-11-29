'use strict';

/**
 * @ngdoc service
 * @name musetrapApp.Data
 * @description service dedicated to data retrieval
 */
angular.module('musetrapApp')
  .factory('Data', ['$http', '$q', function Data($http, $q) {

    Data.availableBundles = [];
    Data.availableLanguages = [];
    Data.availableRecipes = [];

    /**
     * Retrieves ingredient_bundles data for the specified bundleIds
     * @param bundleIds an array with bundle ids
     * @return an array of promises, one for each requested bundle
     */
    Data.getIngredients = function(bundleIds) {
      var promises = [];
      angular.forEach(bundleIds, function(bundleId) {
        promises.push($http.get('data/ingredient_bundles/' + bundleId + '.json'));
      });

      return $q.all(promises);
    };

    /**
     * Retrieves the recipes file
     * @return a promise for the recipes
     */
    Data.getAvailableRecipes = function() {
      return $http.get('data/recipes.json')
        .success(function(retrievedData) {
          Data.availableRecipes = retrievedData;
        })
        .error(function() {
          //NotificationFactory.showError();
        });
    };

    /**
     * Retrieves metadata file and extracts available bundles
     * @return a promise for the available bundles
     */
    Data.getAvailableBundles = function() {
      return $http.get('metadata.json')
        .success(function(retrievedData) {
          Data.availableBundles = retrievedData.availableBundles;
        })
        .error(function() {
          //NotificationFactory.showError();
        });
    };

    /**
     * Retrieves metadata file and extracts available languages
     * @return a promise for the available languages
     */
    Data.getAvailableLanguages = function() {
      return $http.get('metadata.json')
        .success(function(retrievedData) {
          Data.availableLanguages = retrievedData.availableLanguages;
        })
        .error(function() {
          //NotificationFactory.showError();
        });
    };

    return Data;
  }]);
