'use strict';

describe('TF2Stadium', function () {
  var addLobbyFab = $('div#fab > a');

  beforeAll(function () {
    browser.get('/');
  });

  it('should have a title', function () {
    expect(browser.getTitle()).toMatch(/(\(!\) )?TF2Stadium/);
    takeScreenshot('title-loaded');
  });

  it('the add lobby fab should go to the ', function () {
    expect(addLobbyFab.isPresent()).toBe(true);
    addLobbyFab.click();

    expect(browser.getLocationAbsUrl()).toMatch(/\/create\/format$/);
    takeScreenshot('add-lobby-fab-clicked');
  });
});
