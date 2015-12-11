module.exports = function(grunt) {
  var inquirer = require("inquirer");
  // create ingredient_bundle translation files
  grunt.registerTask('newBundle', 'Create ingredient_bundle', function(bundleName) {
    if (!bundleName || !bundleName.length) {
      grunt.fail.warn("You need to specify a bundle name.");
    }

    var done = this.async();
    var ingredientsArray = [];

    // TODO build questions dinamically to add questions for translations
    var questions = [{
      type: "input",
      name: "ingredient",
      message: "Ingredient key: "
    }, {
      type: "confirm",
      name: "askAgain",
      message: "Another ingredient?",
      default: true
    }];

    function ask() {
      inquirer.prompt(questions, function(answers) {
        ingredientsArray.push(answers.ingredient);
        if (answers.askAgain) {
          ask();
        }
        else {
          createBundleFile(bundleName, ingredientsArray);
          done();
        }
      });
    }

    function createBundleFile(bundleName, ingredientsArray) {
      // write bundle
      var destPath = grunt.config.get('data.ingredient_bundles.dest');
      var bundleFile = destPath + bundleName + ".json";
      if (!grunt.file.exists(bundleFile)) {
        grunt.file.write(bundleFile, JSON.stringify(ingredientsArray, null, '\t'));
      }
      grunt.task.run(['sortBundle:' + bundleName]);
      grunt.task.run(['createTranslationFiles:' + bundleName]);
    };

    ask();
  });
};
