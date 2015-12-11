module.exports = function(grunt) {
  var inquirer = require("inquirer");
  grunt.registerTask('sortBundle', 'Sort bundle', function(bundleName) {
    if (!bundleName || !bundleName.length) {
      grunt.fail.warn("You need to specify a bundle name.");
    }
    // generate the list of available bundles
    var destPath = grunt.config.get('data.ingredient_bundles.dest');
    var bundleFile = destPath + bundleName + ".json";
    // read bundle
    var bundleData = grunt.file.readJSON(bundleFile);

    bundleData = bundleData.sort();

    // write bundle
    grunt.file.write(bundleFile, JSON.stringify(bundleData, null, '\t'));
  });

};
