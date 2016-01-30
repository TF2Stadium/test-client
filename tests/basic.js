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
});
