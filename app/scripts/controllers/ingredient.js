'use strict';

/**
 * @ngdoc function
 * @name musetrapApp.controller:IngredientCtrl
 * @description
 * # IngredientCtrl
 * Controller of the musetrapApp
 */
angular.module('musetrapApp')
  .controller('IngredientCtrl', ['$scope', 'Data',
    function($scope, Data) {
      $scope.ingredients = [];

      $scope.getRecipe = function() {
        $scope.ingredients = Data.getIngredients();
      };
    }
  ]);
