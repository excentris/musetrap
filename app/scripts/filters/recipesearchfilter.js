'use strict';

/**
 * @ngdoc filter
 * @name musetrapApp.filter:searchFilter
 * @function
 * @description
 * Filter that matches recipes against a string by searching both in name and
 * description.
 */
angular.module('musetrapApp')
  .filter('recipeSearchFilter', ['$translate', function($translate) {
    return function(recipes, search) {
      var out = [];
      if (angular.isArray(recipes)) {
        recipes.forEach(function(recipe) {
          var itemMatches = false;

          var recipeId = recipe.id;
          var recipeName = $translate.instant(recipeId + ".name");
          var recipeDescription = $translate.instant(recipeId + ".description");

          var text = search.toLowerCase();
          if (recipeName.toString().toLowerCase().indexOf(text) !== -1 ||
            recipeDescription.toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
          }

          if (itemMatches) {
            out.push(recipe);
          }
        });
      }

      return out;
    };
  }]);
