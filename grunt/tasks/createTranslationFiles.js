module.exports = function(grunt) {
  // create ingredient_bundle translation files
  grunt.registerTask('createTranslationFiles', 'Create ingredient_bundle translation files', function() {
    // generate the list of available bundles
    var bundlePaths = grunt.file.expand(grunt.config.get('metadata.src'));
    bundlePaths.forEach(function(bundlePath) {
      var bundleNameAndExtension = bundlePath.match(/\/([^/]*)$/)[1];
      var bundleName = bundleNameAndExtension.substr(0, bundleNameAndExtension.lastIndexOf('.'));

      // read bundle
      var bundleData = grunt.file.readJSON(bundlePath);

      // create translation file
      var bundleTranslationSkeleton = {};
      bundleData.forEach(function(ingredientKey) {
        bundleTranslationSkeleton[ingredientKey] = "";
      });

      // write bundle
      var destPath = grunt.config.get('i18n.ingredient_bundles.dest');
      var locales = grunt.config.get('i18n.locales');
      locales.forEach(function(locale) {
        var bundleTranslationSkeletonPath = destPath + bundleName + "_" + locale + ".json";
        if (!grunt.file.exists(bundleTranslationSkeletonPath)) {
          grunt.file.write(bundleTranslationSkeletonPath, JSON.stringify(bundleTranslationSkeleton, null, '\t'));
        }
      });
    });
  });
};
