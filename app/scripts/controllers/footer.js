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
      $scope.availableLanguages = [];
      $scope.selectedLanguage = 'en';
      // retrieve available languages from metadata file
      var metadataPromise = Data.getMetadata();
      metadataPromise.then(function success(retrievedData) {
        $scope.availableLanguages = retrievedData.data.availableLanguages;
      }, function(errorMsg) {
        console.log('An error occurred: ', errorMsg);
      });

      /**
       * Change the application language.
       * @param langKey e.g. 'en', 'es'
       */
      $scope.changeLanguage = function(langKey) {
        $translate.use(langKey);
      };

      /**
       * Check if the specified location is active.
       * @param  String viewLocation the location check
       * @return true if the specified location is active, false otherwise
       */
      $scope.isActiveLocation = function(viewLocation) {
        return viewLocation === $location.path();
      };
    }
  ]);
