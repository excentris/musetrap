'use strict';

/**
 * @ngdoc function
 * @name musetrapApp.controller:ConfigurationCtrl
 * @description
 * # ConfigurationCtrl
 * Controller of the musetrapApp
 */
angular.module('musetrapApp')
  .controller('ConfigurationCtrl', ['$scope', 'Data', function($scope, Data) {
    $scope.availableBundles = [];

    // retrieve available bundles from metadata file
    var metadataPromise = Data.getMetadata();
    metadataPromise.then(function success(retrievedData) {
      $scope.availableBundles = retrievedData.data.availableBundles;
    }, function(errorMsg) {
      console.log('An error occurred: ', errorMsg);
    });

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
