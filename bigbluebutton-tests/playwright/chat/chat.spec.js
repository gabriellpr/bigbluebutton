const { test } = require('@playwright/test');
const { Chat } = require('./chat');
const { PrivateChat } = require('./privateChat');

test.describe.parallel('Chat', () => {
  // https://docs.bigbluebutton.org/2.6/release-tests.html#public-message-automated
  test('Send public message @ci', async ({ browser, page }) => {
    const chat = new Chat(browser, page);
    await chat.init(true, true);
    await chat.sendPublicMessage();
  });

  // https://docs.bigbluebutton.org/2.6/release-tests.html#private-message-automated
  test('Send private message @ci', async ({ browser, context, page }) => {
    const privateChat = new PrivateChat(browser, context);
    await privateChat.initPages(page);
    await privateChat.sendPrivateMessage();
  });

  test('Clear chat', async ({ browser, page }) => {
    const chat = new Chat(browser, page);
    await chat.init(true, true);
    await chat.clearChat();
  });

  test('Copy chat', async ({ browser, context, page }, testInfo) => {
    test.fixme(testInfo.project.use.headless, 'Only works in headed mode');
    const chat = new Chat(browser, page);
    await chat.init(true, true);
    await chat.copyChat(context);
  });

  test('Save chat', async ({ browser, page }, testInfo) => {
    const chat = new Chat(browser, page);
    await chat.init(true, true);
    await chat.saveChat(testInfo);
  });

  // https://docs.bigbluebutton.org/2.6/release-tests.html#chat-character-limit-automated
  test('Verify character limit', async ({ browser, page }) => {
    const chat = new Chat(browser, page);
    await chat.init(true, true);
    await chat.characterLimit();
  });

  // https://docs.bigbluebutton.org/2.6/release-tests.html#sending-empty-chat-message-automated
  test('Not able to send an empty message', async ({ browser, page }) => {
    const chat = new Chat(browser, page);
    await chat.init(true, true);
    await chat.emptyMessage();
  });

  test('Close private chat @ci', async ({ browser, context, page }) => {
    const privateChat = new PrivateChat(browser, context);
    await privateChat.initPages(page);
    await privateChat.closeChat();
  });

  test('Private chat disabled when user leaves meeting @ci', async ({ browser, context, page }) => {
    const privateChat = new PrivateChat(browser, context);
    await privateChat.initPages(page);
    await privateChat.chatDisabledUserLeaves();
  });

  // Emojis Test
  test('Emoji Picker send', async ({ browser, page }) => {
    const emoji = new Chat(browser, page);
    await emoji.init(true, true);
    await emoji.sendEmoji();
  });

  test('Emoji Picker copy chat', async ({ browser, context, page }, testInfo) => {
    test.fixme(testInfo.project.use.headless, 'Only works in headed mode');
    const chat = new Chat(browser, page);
    await chat.init(true, true);
    await chat.emojiCopyChat(context);
  });

  test('Emoji Picker save chat', async ({ browser, page }, testInfo) => {
    const chat = new Chat(browser, page);
    await chat.init(true, true);
    await chat.emojiSaveChat(testInfo);
  });

  test('Emoji Picker Send Private Chat', async ({ browser, context, page }) => {
    const emojiprivatechat = new PrivateChat(browser, context);
    await emojiprivatechat.initPages(page);
    await emojiprivatechat.emojiSendPrivateChat();
  });

  test('Auto Convert Emoji Send', async ({ browser, page }) => {
    const emoji = new Chat(browser, page);
    await emoji.init(true, true);
    await emoji.autoConvertEmojiPublicChat();
  });

  test('Auto Convert emoji copy chat', async ({ browser, context, page }, testInfo) => {
    test.fixme(testInfo.project.use.headless, 'Only works in headed mode');
    const chat = new Chat(browser, page);
    await chat.init(true, true);
    await chat.autoConvertEmojiCopyChat(context);
  });

  test('Auto Convert emoji save chat', async ({ browser, page }, testInfo) => {
    const chat = new Chat(browser, page);
    await chat.init(true, true);
    await chat.autoConvertEmojiSaveChat(testInfo);
  });

  test('Auto Convert Emoji Send Private Chat', async ({ browser, context, page }) => {
    const emojiprivatechat = new PrivateChat(browser, context);
    await emojiprivatechat.initPages(page);
    await emojiprivatechat.autoConvertEmojiSendPrivateChat();
  });
});