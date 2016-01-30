'use strict';

describe('Filter: translateArray', function() {


  // load the filter's module
  beforeEach(module('musetrapApp'));
  // for the tests, replace the translation provider to have static translations
  angular.module('musetrapApp')
    .config(function($translateProvider) {
      $translateProvider.translations('en', {
        "animal_traits": "Animal traits",
        "animals": "Animals",
        "creatures": "Creatures",
        "colors_basic": "Colors (basic)",
        "emotions": "Emotions",
        "physical_actions": "Physical actions",
        "plants": "Plants",
        "transportation": "Transportation",
        "weapons": "Weapons"
      });
      $translateProvider.preferredLanguage('en');
    });

  // initialize a new instance of the filter before each test
  var translateArray;
  beforeEach(inject(function($filter) {
    translateArray = $filter('translateArray');
  }));

  it('should return the input array translated and comma separated', function() {
    expect(translateArray(['animals'])).toBe('Animals');
    expect(translateArray(['animals', 'animals'])).toBe('Animals, Animals');
    expect(translateArray(['animals', 'physical_actions'])).toBe('Animals, Physical actions');
    expect(translateArray([])).toBe('');
  });

});
