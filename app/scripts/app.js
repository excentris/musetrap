'use strict';

/**
 * @ngdoc overview
 * @name musetrapApp
 * @description
 * # musetrapApp
 *
 * Main module of the application.
 */
angular
  .module('musetrapApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.select',
    'pascalprecht.translate',
    'toastr',
    'as.sortable'
  ]).config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/feedback', {
        templateUrl: 'views/feedback.html',
        controller: 'FeedbackCtrl',
        controllerAs: 'feedback'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).config(function($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart('app/ui');
    $translatePartialLoaderProvider.addPart('recipes');
    $translatePartialLoaderProvider.addPart('ingredient_bundles');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: 'i18n/{part}_{lang}.json'
    });
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
  }).run(function($rootScope, $translate) {
    $rootScope.$on('$translatePartialLoaderStructureChanged', function() {
      $translate.refresh();
    });
  });
