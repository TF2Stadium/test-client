/*global exports,browser */

'use strict';

var fs = require('fs');
var path = require('path');

function dirExists(dirName) {
  try {
    var stat = fs.statSync(dirName);
    return stat.isDirectory();
  }
  catch (e) {
    return false;
  }
}

function writeScreenShot(data, filename) {
  var stream = fs.createWriteStream(filename);
  stream.write(new Buffer(data, 'base64'));
  stream.end();
}

function saveScreenshot(filename) {
  browser.takeScreenshot().then(function (png) {
    writeScreenShot(png, filename);
  });
}

exports.config = {
  framework: 'jasmine',

  baseUrl: 'http://localhost:8080/',
  directConnect: true,

  specs: ['tests/**.js'],
  capabilities: {
    browserName: 'firefox'
  },

  params: {
    viewport: {
      width: 1200,
      height: 900
    },
    screenshots: 'screenshots'
  },

  onPrepare: function () {
    if (browser.params.screenshots && browser.params.screenshots !== 'false') {
      var screenshotsDir = browser.params.screenshots;

      if (!dirExists(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
      }

      global.takeScreenshot = function (name) {
        saveScreenshot(path.join(screenshotsDir, name + '.png'));
      };
    } else {
      global.takeScreenshot = function () {};
    }

    var win = browser.manage().window();
    var viewport = browser.params.viewport;
    win.setSize(viewport.width, viewport.height);
  }
};
