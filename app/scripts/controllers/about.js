'use strict';

/**
 * @ngdoc function
 * @name musetrapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the musetrapApp
 */
angular.module('musetrapApp')
  .controller('AboutCtrl', ['$scope', '$translate', function($scope, $translate) {

    /**
     * Returns the url of the html content depending on the language currently in use.
     * @return url of the html content
     */
    $scope.getAboutContent = function() {
      // if proposedLanguage returns something different from undefined,
      // $translate is in the process of setting a new language and so that one
      // should be used when trying to determine the about content.
      var language = $translate.proposedLanguage() || $translate.use();
      return "views/about_" + language + ".html";
    };
  }]);
