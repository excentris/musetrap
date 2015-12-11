module.exports = function(grunt) {
  var inquirer = require("inquirer");
  // create ingredient_bundle translation files
  grunt.registerTask('createTranslationFiles', 'Create ingredient_bundle translation files', function(bundleName) {
    if (!bundleName || !bundleName.length) {
      grunt.fail.warn("You need to specify a bundle name.");
    }

    var locales = grunt.config.get('i18n.locales');
    var destPath = grunt.config.get('data.ingredient_bundles.dest');
    var bundleFile = destPath + bundleName + ".json";
    var bundleData = grunt.file.readJSON(bundleFile);

    // for each available locale
    locales.forEach(function(locale) {
      var bundleTranslationSkeleton = {};

      // ask for the translation for each ingredient key
      bundleData.forEach(function(ingredientKey) {
        bundleTranslationSkeleton[ingredientKey] = "";
      });

      var i18nDestPath = grunt.config.get('i18n.ingredient_bundles.dest');
      var bundleTranslationSkeletonPath = i18nDestPath + bundleName + "_" + locale + ".json";
      if (!grunt.file.exists(bundleTranslationSkeletonPath)) {
        grunt.file.write(bundleTranslationSkeletonPath, JSON.stringify(bundleTranslationSkeleton, null, '\t'));
      }
    });
  });
};
