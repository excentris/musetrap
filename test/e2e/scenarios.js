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
});
