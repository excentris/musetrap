'use strict';

/**
 * @ngdoc function
 * @name musetrapApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the musetrapApp
 */
angular.module('musetrapApp')
  .controller('FooterCtrl', ['$scope', '$translate', '$location',
    function($scope, $translate, $location) {
      /**
       * Change the application language.
       * @param langKey e.g. 'en', 'es'
       */
      $scope.changeLanguage = function(langKey) {
        $translate.use(langKey);
      };

      /**
       * Check if the specified langKey corresponds to the active language.
       * @param  String langKey the key of the language to check if it is active.
       * @return true if the specified langKey corresponds to the active language.
       */
      $scope.isActiveLanguage = function(langKey) {
        return langKey === $translate.use();
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
