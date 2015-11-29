'use strict';

/**
 * @ngdoc function
 * @name musetrapApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the musetrapApp
 */
angular.module('musetrapApp')
  .controller('FooterCtrl', ['$scope', '$translate', '$location', 'Data',
    function($scope, $translate, $location, Data) {
      $scope.location = {
        active: ""
      };
      $scope.$on('$locationChangeSuccess', function() {
        $scope.location.active = $location.path();
      });

      $scope.availableLanguages = [];
      $scope.selectedLanguage = undefined;

      var translateReadyPromise = $translate.onReady();
      translateReadyPromise.then(function() {
        $scope.selectedLanguage = $translate.use();
      });

      // retrieve available languages from metadata file
      Data.getAvailableLanguages().then(function() {
        $scope.availableLanguages = Data.availableLanguages;
      });

      /**
       * Change the application language.
       * @param langKey e.g. 'en', 'es'
       */
      $scope.changeLanguage = function(langKey) {
        $scope.selectedLanguage = langKey;
        $translate.use(langKey);
      };
    }
  ]);
