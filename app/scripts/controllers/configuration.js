'use strict';

/**
 * @ngdoc function
 * @name musetrapApp.controller:ConfigurationCtrl
 * @description
 * # ConfigurationCtrl
 * Controller of the musetrapApp
 */
angular.module('musetrapApp')
  .controller('ConfigurationCtrl', ['$scope', 'Data', function($scope, Data) {
    $scope.availableBundles = [];
    $scope.availableRecipes = [];
    $scope.selectedBundles = [];

    // retrieve available bundles from metadata file
    var metadataPromise = Data.getMetadata();
    metadataPromise.then(function success(retrievedData) {
      $scope.availableBundles = retrievedData.data.availableBundles;
      $scope.availableRecipes = retrievedData.data.availableRecipes;
    }, function(errorMsg) {
      console.log('An error occurred: ', errorMsg);
    });

    /**
     * Toggle selection for a given bundle by its id
     * @param  bundleId the id of the bundle being toggled
     */
    $scope.toggleBundleSelection = function toggleBundleSelection(bundleId) {
      if (_.contains($scope.availableBundles, bundleId)) {
        var idx = $scope.selectedBundles.indexOf(bundleId);
        // is currently selected
        if (idx > -1) {
          $scope.selectedBundles.splice(idx, 1);
        }
        // is newly selected
        else {
          $scope.selectedBundles.push(bundleId);
        }
      }
    };

    /**
     * Changes the recipe by changing the selected bundles based on selectedRecipe.
     */
    $scope.changeRecipe = function changeRecipe() {
      var selectedRecipe = $scope.selectedRecipe;
      if (selectedRecipe) {
        var recipePromise = Data.getRecipe(selectedRecipe);
        recipePromise.then(function success(retrievedData) {
          $scope.selectedBundles = retrievedData.data.ingredients;
          $scope.selectedRecipeDescription = retrievedData.data.description;
        }, function(errorMsg) {
          console.log('An error occurred: ', errorMsg);
        });
      }
      else {
        $scope.selectedBundles = [];
        $scope.selectedRecipeDescription = "";
      }
    };
  }]);
