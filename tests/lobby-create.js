'use strict';

var EC = protractor.ExpectedConditions;

describe('TF2Stadium', function () {
  var addLobbyFab = $('div#fab > a');
  var lobbyCreateGrid = $$('#wizard > md-grid-tile');

  function getWizardOption(title) {
    var d = protractor.promise.defer();

    lobbyCreateGrid.then(function (tiles) {
      protractor.promise.all(
        tiles.map(function (tile) {
          var d2 = protractor.promise.defer();

          tile.$('.title').getText().then(function (t) {
            d2.fulfill({el: tile, text: t});
          });

          return d2.promise;
        })
      ).then(function (els) {
        d.fulfill(els.filter(function (o) {
          return o.text === title;
        })[0].el);
      }, function () {
        d.reject();
      });
    });

    return d.promise;
  }

  beforeAll(function () {
    browser.get('/');
  });

  it('the add lobby fab should go to the lobby create page', function () {
    expect(addLobbyFab.isPresent()).toBe(true);
    addLobbyFab.click();

    expect(browser.getLocationAbsUrl()).toMatch(/\/create\/format$/);
    takeScreenshot('add-lobby-fab-clicked');
  });

  it('choosing a format should move to the map step', function (done) {
    getWizardOption('6s').then(function (el) {
      el.click();
      takeScreenshot('post-format-chosen');
      var i = 0;
      browser.wait(function () {
        takeScreenshot('post-format-chosen-' + ++i);
        browser.getLocationAbsUrl().then(function (url) {
          console.log(url);
          return url.match(/\/create\/map$/) !== null;
        });
      }, 10000);

      // EC.textToBePresentInElement($('.lobbypage-rules > span[ng-show="header.lobbyInformation.type"]'), '6s')

//      expect().toMatch();
      takeScreenshot('post-format-chosen2');

      done();
    });
  });
});
