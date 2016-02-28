'use strict';

/**
 * @ngdoc function
 * @name musetrapApp.controller:FeedbackCtrl
 * @description
 * # FeedbackCtrl
 * Controller of the musetrapApp
 */
angular.module('musetrapApp')
  .controller('FeedbackCtrl', ['$scope', '$http', '$translate', '$httpParamSerializer', 'NotificationFactory',
    function FeedbackCtrl($scope, $http, $translate, $httpParamSerializer, NotificationFactory) {
      $scope.feedback = {};
      $scope.submittedForm = false;
      FeedbackCtrl.formUrl = "http://formspree.io/netrunner+musetrap@gmail.com";

      // process and submit the form
      $scope.processForm = function(isValid) {
        $scope.submitted = true;
        if (isValid) {
          $http({
            method: "POST",
            url: FeedbackCtrl.formUrl,
            data: $httpParamSerializer($scope.feedback),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function() {
            NotificationFactory.success($translate.instant("feedback.submit_form_success"));
          }, function() {
            NotificationFactory.error($translate.instant("feedback.submit_form_error"));
          });
        }
        else {
          $scope.submittedForm = true;
          NotificationFactory.error($translate.instant("feedback.submit_form_invalid"));
        }
      };
    }
  ]);
