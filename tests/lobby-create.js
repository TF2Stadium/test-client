describe('TF2Stadium', function () {
  var addLobbyFab = $('div#fab > a');
  var lobbyCreateGrid = $$('#wizard > md-grid-tile');

  function getWizardOption(title) {
    var d = protractor.promise.defer();

    lobbyCreateGrid.then(function (tiles) {
      Promise.all(
        tiles.map(function (tile) {
          return new Promise((resolve, reject) => {
            tile.$('.title').getText()
              .then(t => resolve({el: tile, text: t}));
          });
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

  beforeAll(async function (done) {
    await login();
    done(browser.get(browser.baseUrl));
  });

  it('the add lobby fab should go to the lobby create page', function () {
    expect(addLobbyFab.isPresent()).toBe(true);
    addLobbyFab.click();

    expect(browser.getLocationAbsUrl()).toMatch(/\/create\/format$/);
    takeScreenshot('add-lobby-fab-clicked');
  });

  it('choosing a format should move to the map step', function () {
    getWizardOption('6s').then(function (el) {
      takeScreenshot('pre-format-chosen');
      el.click();
      expect(browser.getLocationAbsUrl()).toMatch(/\/create\/map$/);
      takeScreenshot('post-format-chosen2');
    });
  });
});
