module.exports = function(grunt) {
  var inquirer = require("inquirer");
  // create ingredient_bundle translation files
  grunt.registerTask('newBundle', 'Create ingredient_bundle', function(bundleName) {
    if (!bundleName || !bundleName.length) {
      grunt.fail.warn("You need to specify a bundle name.");
    }

    var done = this.async();
    var locales = grunt.config.get('i18n.locales');
    var ingredientsArray = [];
    var ingredientQuestions = buildIngredientQuestions();
    var bundleNameTranslationQuestions = buildBundleNameTranslationQuestions();
    var translations = {};
    // initialize translation objects, one per locale
    locales.forEach(function(locale) {
      translations[locale] = {};
    });

    function askForIngredients() {
      inquirer.prompt(ingredientQuestions, function(answers) {
        if (answers.ingredient) {
          ingredientsArray.push(answers.ingredient);
        }

        locales.forEach(function(locale) {
          if (answers[locale]) {
            translations[locale][answers.ingredient] = answers[locale];
          }
        });

        if (answers.askAgain) {
          askForIngredients();
        }
        else {
          createBundleFile(bundleName, ingredientsArray);
          createTranslationFiles(bundleName, translations);
          done();
        }
      });
    }

    function askForBundleNameTranslations() {
      inquirer.prompt(bundleNameTranslationQuestions, function(answers) {
        var destPath = grunt.config.get('i18n.dest');
        locales.forEach(function(locale) {
          if (answers[locale]) {
            var translationFile = destPath + "ingredient_bundles_" + locale + ".json";
            var translations = grunt.file.readJSON(translationFile);
            translations[bundleName] = answers[locale];
            grunt.file.write(translationFile, JSON.stringify(translations, null, '\t'));
          }
        });
        grunt.task.run(['metadata']);
        askForIngredients();
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
    }

    function createTranslationFiles(bundleName, translations) {
      // write translation files
      for (var locale in translations) {
        if (translations.hasOwnProperty(locale)) {
          var i18nDestPath = grunt.config.get('i18n.ingredient_bundles.dest');
          var bundleTranslationSkeletonPath = i18nDestPath + bundleName + "_" + locale + ".json";
          if (!grunt.file.exists(bundleTranslationSkeletonPath)) {
            grunt.file.write(bundleTranslationSkeletonPath, JSON.stringify(translations[locale], null, '\t'));
          }
        }
      }
    }

    function buildIngredientQuestions() {
      var questions = [];

      questions.push({
        type: "input",
        name: "ingredient",
        message: "Ingredient key: "
      });

      locales.forEach(function(locale) {
        questions.push({
          type: "input",
          name: locale,
          message: "Translation (" + locale + "):"
        });
      });

      questions.push({
        type: "confirm",
        name: "askAgain",
        message: "Another ingredient?",
        default: true
      });

      return questions;
    }

    function buildBundleNameTranslationQuestions() {
      var questions = [];

      locales.forEach(function(locale) {
        questions.push({
          type: "input",
          name: locale,
          message: "Bundle name translation (" + locale + "):"
        });
      });

      return questions;
    }

    askForBundleNameTranslations();
  });
};
