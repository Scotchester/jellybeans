var webdriverio = require('webdriverio');
var options = {
  desiredCapabilities: {
    browserName: 'phantomjs'
  }
};

// initialise WebdriverCSS for `client` instance

var client = webdriverio
  .remote(options)
  .init();

require('webdrivercss').init(client, {
  // example options
  screenshotRoot: 'test/screenshots',
  failedComparisonsRoot: 'test/screenshots/diffs',
  misMatchTolerance: 0.05,
  screenWidth: [320, 768, 1024, 1200],
});

client
  .url('http://localhost:4000/')
  .webdrivercss('body', {
    name: 'body',
    elem: 'body'
  })
  .end();
