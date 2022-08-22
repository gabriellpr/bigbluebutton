const { test } = require('@playwright/test');
const { Emoji } = require('./emoji');
const { EmojiPrivateChat } = require('./emojiPrivateChat');

test.describe.parallel('Chat', () => {
  test('Send emoji', async ({ browser, page }) => {
    const emoji = new Chat(browser, page);
    await emoji.init(true, true);
    await emoji.sendEmoji();
  });

  test('Emoji clear chat', async ({ browser, page }) => {
    const chat = new Chat(browser, page);
    await chat.init(true, true);
    await chat.emojiClearChat();
  });

  test('Copy chat', async ({ browser, context, page }, testInfo) => {
    test.fixme(testInfo.project.use.headless, 'Only works in headed mode');
    const chat = new Emoji(browser, page);
    await chat.init(true, true);
    await chat.copyChat(context);
  });

  test('Save chat', async ({ browser, page }, testInfo) => {
    const chat = new Emoji(browser, page);
    await chat.init(true, true);
    await chat.saveChat(testInfo);
  });

  // https://docs.bigbluebutton.org/2.6/release-tests.html#chat-character-limit-automated
  test('Verify emoji limit', async ({ browser, page }) => {
    const chat = new Emoji(browser, page);
    await chat.init(true, true);
    await chat.characterLimit();
  });
});

test.describe.parallel('Private Chat', () => {
  test('Emoji Picker Private Chat', async ({ browser, context, page }) => {
    const emojiprivatechat = new EmojiPrivateChat(browser, context);
    await emojiprivatechat.initPages(page);
    await emojiprivatechat.emojiTestPrivateChat();
  });

  test('Close private chat ', async ({ browser, context, page }) => {
    const emojiprivatechat = new EmojiPrivateChat(browser, context);
    await emojiprivatechat.initPages(page);
    await emojiprivatechat.emojiCloseChat();
  });

  test('Private chat disabled when user leaves meeting ', async ({ browser, context, page }) => {
    const emojiprivatechat = new EmojiPrivateChat(browser, context);
    await emojiprivatechat.initPages(page);
    await emojiprivatechat.chatDisabledUserLeaves();
  });
});