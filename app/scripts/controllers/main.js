'use strict';

/**
 * @ngdoc function
 * @name musetrapApp.controller:IngredientCtrl
 * @description
 * # IngredientCtrl
 * Controller of the musetrapApp
 */
angular.module('musetrapApp')
  .controller('MainCtrl', ['$scope', '$q', 'Data',
    function($scope, $q, Data) {
      $scope.availableBundles = ['animals', 'weapons'];
      $scope.selectedBundles = [];
      $scope.ingredients = [];

      /**
       * Creates a recipe based on the selected bundles.
       * @param selectedBundles an array with the selected bundle ids
       */
      $scope.getRecipe = function(selectedBundles) {
        // first get all data for the selected bundles
        var dataPromises = Data.getIngredients(selectedBundles);
        $q.all(dataPromises).then(function success(retrievedData) {
          var mergedData = [];
          // extract ingredient data from each object in retrievedData, which
          // corresponds to each requested bundle, and merge it
          angular.forEach(retrievedData, function(bundleData) {
            mergedData = mergedData.concat(bundleData.data);
          });

          $scope.ingredients = mergedData;
        });
      };

      /**
       * Toggle selection for a given bundle by its id
       * @param  bundleId the id of the bundle being toggled
       */
      $scope.toggleBundleSelection = function toggleBundleSelection(bundleId) {
        var idx = $scope.selectedBundles.indexOf(bundleId);
        // is currently selected
        if (idx > -1) {
          $scope.selectedBundles.splice(idx, 1);
        }
        // is newly selected
        else {
          $scope.selectedBundles.push(bundleId);
        }
      };
    }
  ]);
