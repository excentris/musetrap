'use strict';

/**
 * @ngdoc function
 * @name musetrapApp.controller:IngredientCtrl
 * @description
 * # IngredientCtrl
 * Controller of the musetrapApp
 */
angular.module('musetrapApp')
  .controller('MainCtrl', ['$scope', 'Data',
    function($scope, Data) {
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
        dataPromises.then(function success(retrievedData) {
          var mergedData = [];

          // extract ingredient data from each object in retrievedData, which
          // corresponds to each requested bundle, and merge it
          angular.forEach(retrievedData, function(bundleData) {
            // sample data to limit the amount of selected ingredients per bundle
            var sampledData = _.sample(bundleData.data);
            mergedData = mergedData.concat(sampledData);
          });

          $scope.ingredients = mergedData;
        }, function(errorMsg) {
          // if any of the previous promises gets rejected
          // the success callback will never be executed
          // the error callback will be called...
          console.log('An error occurred: ', errorMsg);
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
