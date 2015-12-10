module.exports = function(grunt) {
  // generate metadata file
  grunt.registerTask('metadata', 'Generate metadata', function() {
    var metadata = {};

    // generate the list of available bundles
    var bundlePaths = grunt.file.expand(grunt.config.get('metadata.src'));
    metadata.availableBundles = [];
    bundlePaths.forEach(function(bundlePath) {
      var bundleNameAndExtension = bundlePath.match(/\/([^/]*)$/)[1];
      var bundleName = bundleNameAndExtension.substr(0, bundleNameAndExtension.lastIndexOf('.'));
      metadata.availableBundles.push(bundleName);
    });

    // add locale related stuff
    metadata.availableLanguages = grunt.config.get('i18n.locales');

    grunt.file.write(grunt.config.get('yeoman.app') + '/metadata.json', JSON.stringify(metadata, null, '\t'));
  });
}
