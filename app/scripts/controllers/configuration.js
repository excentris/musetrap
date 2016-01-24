'use strict';

/**
 * @ngdoc function
 * @name musetrapApp.controller:ConfigurationCtrl
 * @description
 * # ConfigurationCtrl
 * Controller of the musetrapApp
 */
angular.module('musetrapApp')
  .controller('ConfigurationCtrl', ['$scope', 'DataFactory', '$translatePartialLoader',
    function($scope, DataFactory, $translatePartialLoader) {
      $scope.mode = 'normal';
      $scope.availableRecipes = [];
      $scope.bundles = {};
      $scope.bundles.available = [];
      $scope.bundles.selected = [];
      $scope.recipe = {};

      // drag and drop options for the available bundles panel in tweak mode
      $scope.sortableAvailableBundles = {
        clone: true,
        dragStart: function() {
          $scope.sortableSelectedBundles.showEmptyState = false;
        },
        dragEnd: function() {
          $scope.sortableSelectedBundles.showEmptyState = true;
        }
      };

      // drag and drop options for the selected bundles panel in tweak mode
      $scope.sortableSelectedBundles = {
        showDropZone: false,
        showEmptyState: true,
        allowDuplicates: true,
        dragStart: function() {
          $scope.sortableSelectedBundles.showDropZone = true;
        },
        dragEnd: function(event) {
          var outside = event.dest.sortableScope.$id !== event.source.sortableScope.$id;
          if (outside) {
            event.source.sortableScope.removeItem(event.source.index);
          }
          $scope.sortableSelectedBundles.showDropZone = false;
        }
      };

      // drag and drop options for the drop zone used to remove selected bundles in tweak mode
      $scope.sortableRemoveBundles = {};

      $scope.$watchCollection('bundles.selected', function(newValue) {
        newValue.forEach(function(bundle) {
          $translatePartialLoader.addPart('ingredient_bundles/' + bundle);
        });
      });

      // retrieve available bundles from metadata file
      DataFactory.getAvailableBundles().then(function() {
        $scope.bundles.available = DataFactory.availableBundles;
      });

      // retrieve available recipes
      DataFactory.getAvailableRecipes().then(function() {
        $scope.availableRecipes = DataFactory.availableRecipes;
      });

      /**
       * Changes the recipe by changing the selected bundles based on selectedRecipe.
       * @param $selectedRecipe the selected recipe object
       */
      $scope.changeSelectedRecipe = function changeSelectedRecipe($selectedRecipe) {
        if ($selectedRecipe) {
          $scope.bundles.selected = angular.copy($selectedRecipe.ingredient_bundles);
        }
        else {
          $scope.bundles.selected = [];
          $scope.recipe = {};
        }
      };

      /**
       * Toggle recipe creation mode between normal or tweak. Normal mode simply
       * shows the createRecipe button after selecting a recipe. Tweak mode shows
       * the different bundle checkboxes as well to further tweak the recipe.
       */
      $scope.toggleMode = function toggleMode() {
        if ($scope.mode === 'normal') {
          $scope.mode = 'tweak';
        }
        else {
          $scope.mode = 'normal';
        }
      };

      /**
       * Clear the bundles.selected array.
       */
      $scope.clearSelectedBundles = function clearSelectedBundles() {
        $scope.bundles.selected = [];
      };

      /**
       * Custom track by function to be able to have duplicates inside the
       * bundles ng-repeat. This is necessary to avoid issues with ng-sortable.
       */
      $scope.bundleTracking = function(index, bundleId) {
        return index + bundleId;
      };
    }
  ]);
