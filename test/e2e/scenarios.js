describe('Musetrap app', function() {
  it('should have Musetrap as title', function() {
    browser.get('/');
    expect(browser.getTitle()).toBe('Musetrap');
  });

  it('should have home as default active menu item', function() {
    expect(element(by.css('#navigation-menu')).element(by.css('.active')).getText()).toEqual('Home');
  });

  it('should only have one active menu item', function() {
    expect(element(by.css('#navigation-menu')).all(by.css('.active')).count()).toEqual(1);
  });

  it('should only have about active menu item when navigating there', function() {
    browser.get('/#/about');
    expect(element(by.css('#navigation-menu')).element(by.css('.active')).getText()).toEqual('About');
  });

  it('should only have feedback active menu item when navigating there', function() {
    browser.get('/#/feedback');
    expect(element(by.css('#navigation-menu')).element(by.css('.active')).getText()).toEqual('Feedback');
  });

  it('should correctly toggle the bundle selection', function() {
    browser.get('/');
    // intially bundle selection should be hidden
    expect(element(by.className('bundle-selection-container')).isDisplayed()).toBeFalsy();
    expect(element(by.className('inspire-button-container')).isDisplayed()).toBeFalsy();
    // after clicking on Tweaks...
    element(by.className('recipe-tweak')).element(by.tagName('button')).click();
    // ... the bundle selection ui should be visible
    expect(element(by.className('bundle-selection-container')).isDisplayed()).toBeTruthy();

    // .. no results should be displayed at this point
    expect(element(by.className('recipe-result-container')).isDisplayed()).toBeFalsy();
    expect(element(by.className('inspire-button-container')).isDisplayed()).toBeFalsy();
  });

  it('should correctly show the inspire button after selecting a recipe', function() {
    browser.get('/');
    expect(element(by.className('recipe-choices')).isDisplayed()).toBeFalsy();
    expect(element(by.className('inspire-button-container')).isDisplayed()).toBeFalsy();
    // after opening the select
    element(by.className('ui-select-toggle')).click();
    expect(element(by.className('recipe-choices')).isDisplayed()).toBeTruthy();

    // check that the list has items
    var list = element.all(by.className('ui-select-choices-row'));
    expect(list.count()).toBeGreaterThan(0);
    // and click the first one
    list.first().click();
    // now the inspire button should be visible
    expect(element(by.className('inspire-button-container')).isDisplayed()).toBeTruthy();
    // but no results should be visible yet
    expect(element(by.className('recipe-result-container')).isDisplayed()).toBeFalsy();
  });

  it('should show some results after clicking the inspire button', function() {
    browser.get('/');
    element(by.className('ui-select-toggle')).click();
    element.all(by.className('ui-select-choices-row')).first().click();
    // now the inspire button should be visible
    element(by.className('inspire-button-container')).click();
    // now some results should be available
    expect(element(by.className('recipe-result-container')).isDisplayed()).toBeTruthy();
  });
});
