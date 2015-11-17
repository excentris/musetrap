'use strict';

/**
 * @ngdoc function
 * @name musetrapApp.controller:ConfigurationCtrl
 * @description
 * # ConfigurationCtrl
 * Controller of the musetrapApp
 */
angular.module('musetrapApp')
  .controller('ConfigurationCtrl', ['$scope', 'Data', '$translatePartialLoader',
    function($scope, Data, $translatePartialLoader) {
      $scope.availableBundles = [];
      $scope.availableRecipes = [];
      $scope.selectedBundles = [];
      $scope.recipe = {};

      $scope.$watchCollection('selectedBundles', function(newValue) {
        // TODO optimize this
        newValue.forEach(function(bundle) {
          $translatePartialLoader.addPart('ingredient_bundles/' + bundle);
        });
      });

      // retrieve available bundles from metadata file
      var metadataPromise = Data.getMetadata();
      metadataPromise.then(function success(retrievedData) {
        $scope.availableBundles = retrievedData.data.availableBundles;
      }, function(errorMsg) {
        console.log('An error occurred: ', errorMsg);
      });


      var recipesPromise = Data.getRecipes();
      recipesPromise.then(function success(retrievedData) {
        $scope.availableRecipes = retrievedData.data;
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
      $scope.changeRecipe = function changeRecipe($selectedRecipe) {
        if ($selectedRecipe) {
          $scope.selectedBundles = $selectedRecipe.ingredient_bundles;
        }
        else {
          $scope.selectedBundles = [];
          $scope.recipe = {};
        }
      };
    }
  ]);
