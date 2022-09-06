const { test } = require('@playwright/test');
const { Options } = require('./options');

test.describe.parallel('Options', () => {
  test('Open about modal', async ({ browser, page }) => {
    const about = new Options(browser, page);
    await about.init(true, true);
    await about.openedAboutModal();
  });
});

test.describe.parallel('Settings', () => {
  // https://docs.bigbluebutton.org/2.6/release-tests.html#application-settings
  test(`Locales`, async ({ browser, page }) => {
    test.slow();
    const language = new Options(browser, page);
    await language.init(true, true);
    await language.localesTest();
  });
});

test.describe.parallel.only('Help Button', () => {
  test('Open Help Button', async ({ browser, page, context }) => {
    test.slow();
    const helpButton = new Options(browser, page);
    await helpButton.init(true, true);
    await helpButton.openHelp(context);
  });
});