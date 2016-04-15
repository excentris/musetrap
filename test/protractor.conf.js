exports.config = {
  // location of the Selenium JAR file and chromedriver, use these if you installed protractor locally
  seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar',
  chromeDriver: '../node_modules/protractor/selenium/chromedriver_2.21',

  // location of your E2E test specs
  specs: [
    '../test/e2e/*.js'
  ],

  // configure multiple browsers to run tests
  multiCapabilities: [{
    'browserName': 'chrome'
  }],

  // or configure a single browser
  /*
  capabilities: {
    'browserName': 'chrome'
  }
  */

  // url where your app is running, relative URLs are prepending with this URL
  baseUrl: 'http://localhost:9002/',

  // testing framework, jasmine is the default
  framework: 'jasmine'
};
