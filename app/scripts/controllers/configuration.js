'use strict';

/**
 * @ngdoc function
 * @name musetrapApp.controller:ConfigurationCtrl
 * @description
 * # ConfigurationCtrl
 * Controller of the musetrapApp
 */
angular.module('musetrapApp')
  .controller('ConfigurationCtrl', ['$scope', function($scope) {
    $scope.availableBundles = ['animals', 'weapons', 'creatures'];
    $scope.selectedBundles = [];

    /**
     * Toggle selection for a given bundle by its id
     * @param  bundleId the id of the bundle being toggled
     */
    $scope.toggleBundleSelection = function toggleBundleSelection(bundleId) {
      if (_.contains($scope.availableBundles, bundleId)) {
        var idx = $scope.selectedBundles.indexOf(bundleId);
        // is currently selected
        if (idx > -1) {
          $scope.selectedBundles.splice(idx, 1);
        }
        // is newly selected
        else {
          $scope.selectedBundles.push(bundleId);
        }
      }
    };
  }]);
