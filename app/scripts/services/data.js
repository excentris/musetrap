'use strict';

/**
 * @ngdoc service
 * @name musetrapApp.DataFactory
 * @description service dedicated to data retrieval
 */
angular.module('musetrapApp')
  .factory('DataFactory', ['$http', '$q', 'NotificationFactory', '$translate', function DataFactory($http, $q, NotificationFactory, $translate) {

    DataFactory.availableBundles = [];
    DataFactory.availableLanguages = [];
    DataFactory.availableRecipes = [];

    /**
     * Retrieves ingredient_bundles data for the specified bundleIds
     * @param bundleIds an array with bundle ids
     * @return an array of promises, one for each requested bundle
     */
    DataFactory.getIngredients = function(bundleIds) {
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
    DataFactory.getAvailableRecipes = function() {
      return $http.get('data/recipes.json', {
          cache: true
        })
        .then(function(retrievedData) {
          DataFactory.availableRecipes = retrievedData.data;
        }, function() {
          NotificationFactory.error($translate.instant("errors.get_available_recipes"));
        });
    };

    /**
     * Retrieves metadata file and extracts available bundles
     * @return a promise for the available bundles
     */
    DataFactory.getAvailableBundles = function() {
      return $http.get('metadata.json', {
          cache: true
        })
        .then(function(retrievedData) {
          DataFactory.availableBundles = retrievedData.data.availableBundles;
        }, function() {
          NotificationFactory.error($translate.instant("errors.get_available_bundles"));
        });
    };

    /**
     * Retrieves metadata file and extracts available languages
     * @return a promise for the available languages
     */
    DataFactory.getAvailableLanguages = function() {
      return $http.get('metadata.json', {
          cache: true
        })
        .then(function(retrievedData) {
          DataFactory.availableLanguages = retrievedData.data.availableLanguages;
        }, function() {
          NotificationFactory.error($translate.instant("errors.get_available_languages"));
        });
    };

    return DataFactory;
  }]);
