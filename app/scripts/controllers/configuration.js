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
      $scope.availableBundles = [];
      $scope.availableRecipes = [];
      $scope.selectedBundles = [];
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

      $scope.$watchCollection('selectedBundles', function(newValue) {
        newValue.forEach(function(bundle) {
          $translatePartialLoader.addPart('ingredient_bundles/' + bundle);
        });
      });

      // retrieve available bundles from metadata file
      DataFactory.getAvailableBundles().then(function() {
        $scope.availableBundles = DataFactory.availableBundles;
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
          $scope.selectedBundles = angular.copy($selectedRecipe.ingredient_bundles);
        }
        else {
          $scope.selectedBundles = [];
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
       * Clear the selectedBundles array.
       */
      $scope.clearSelectedBundles = function clearSelectedBundles() {
        $scope.selectedBundles = [];
      };
    }
  ]);
