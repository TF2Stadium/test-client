describe('TF2Stadium', () => {
  var addLobbyFab = $('div#fab > a');
  var lobbyCreateGrid = $$('#wizard > md-grid-tile');

  function getWizardOption(title) {
    var d = protractor.promise.defer();

    lobbyCreateGrid.then(tiles => {
      Promise.all(
        tiles.map(tile => {
          return new Promise(resolve => {
            tile.$('.title').getText()
              .then(t => resolve({el: tile, text: t}));
          });
        })
      ).then(els => {
        d.fulfill(els.filter(o => o.text === title)[0].el);
      }, () => d.reject());
    });

    return d.promise;
  }

  beforeAll(async done => {
    await login();
    done(browser.get(browser.baseUrl));
  });

  it('the add lobby fab should go to the lobby create page', async () => {
    expect(addLobbyFab.isPresent()).toBe(true);
    addLobbyFab.click();

    expect(browser.getLocationAbsUrl()).toMatch(/\/create\/format$/);
    takeScreenshot('add-lobby-fab-clicked');
  });

  it('choosing a format should move to the map step', async () => {
    let el = await getWizardOption('6s');
    takeScreenshot('pre-format-chosen');
    el.click();
    expect(browser.getLocationAbsUrl()).toMatch(/\/create\/map$/);
    takeScreenshot('post-format-chosen2');
  });
});
