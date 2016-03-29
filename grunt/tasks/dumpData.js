module.exports = function(grunt) {
  // generate metadata file
  grunt.registerTask('dumpData', 'Generate a file containing both data and i18n', function() {
    var dump = {
      data: {
        ingredients: {},
        recipes: {}
      },
      i18n: {}
    };

    var bundles = grunt.file.expand(grunt.config.get('yeoman.app') + '/data/ingredient_bundles/*.json');
    bundles.forEach(function(bundle) {
      var bundleNameAndExtension = bundle.match(/\/([^/]*)$/)[1];
      var bundleName = bundleNameAndExtension.substr(0, bundleNameAndExtension.lastIndexOf('.'));
      var bundleData = grunt.file.readJSON(bundle);
      dump.data.ingredients[bundleName] = bundleData;
    });

    var recipes = grunt.file.readJSON(grunt.config.get('yeoman.app') + '/data/recipes.json');
    recipes.forEach(function(recipe) {
      dump.data.recipes[recipe.id] = {
        ingredient_bundles: recipe.ingredient_bundles
      };
    });

    var availableLanguages = grunt.config.get('i18n.locales');
    availableLanguages.forEach(function(lang) {
      dump.i18n[lang] = {
        ingredients: {},
        recipes: {},
        bundles: {}
      };
    });

    var bundleTranslations = grunt.file.expand(grunt.config.get('yeoman.app') + '/i18n/ingredient_bundles/*.json');
    bundleTranslations.forEach(function(bundleTranslation) {
      var bundleNameAndExtension = bundleTranslation.match(/\/([^/]*)$/)[1];
      var lastDotIndex = bundleNameAndExtension.lastIndexOf('.');
      var bundle = bundleNameAndExtension.substr(0, lastDotIndex);
      var lastUnderscoreIndex = bundleNameAndExtension.lastIndexOf('_');
      var bundleName = bundleNameAndExtension.substr(0, lastUnderscoreIndex);
      var bundleLang = bundle.substr(lastUnderscoreIndex + 1, lastDotIndex);
      var bundleTranslationData = grunt.file.readJSON(bundleTranslation);

      dump.i18n[bundleLang].ingredients[bundleName] = bundleTranslationData;
    });

    var recipes = grunt.file.expand(grunt.config.get('yeoman.app') + '/i18n/recipes*.json');
    recipes.forEach(function(recipeTranslations) {
      var recipesNameAndExtension = recipeTranslations.match(/\/([^/]*)$/)[1];
      var lastDotIndex = recipesNameAndExtension.lastIndexOf('.');
      var lastUnderscoreIndex = recipesNameAndExtension.lastIndexOf('_');
      var recipesLang = recipesNameAndExtension.slice(lastUnderscoreIndex + 1, lastDotIndex);

      dump.i18n[recipesLang].recipes = grunt.file.readJSON(recipeTranslations);;
    });

    var bundleNames = grunt.file.expand(grunt.config.get('yeoman.app') + '/i18n/ingredient_bundles*.json');
    bundleNames.forEach(function(bundleNamesTranslations) {
      var nameAndExtension = bundleNamesTranslations.match(/\/([^/]*)$/)[1];
      var lastDotIndex = nameAndExtension.lastIndexOf('.');
      var lastUnderscoreIndex = nameAndExtension.lastIndexOf('_');
      var bundleNamesLang = nameAndExtension.slice(lastUnderscoreIndex + 1, lastDotIndex);

      dump.i18n[bundleNamesLang].bundles = grunt.file.readJSON(bundleNamesTranslations);;
    });

    grunt.file.write(grunt.config.get('yeoman.app') + '/data.json', JSON.stringify(dump, null, '\t'));
  });
}
