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

      $scope.sortableAvailableBundles = {
        clone: true
      };

      $scope.sortableSelectedBundles = {
        allowDuplicates: true
      };

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
    }
  ]);
