const { expect } = require('@playwright/test');
const { openPrivateChat } = require('./util');
const { sleep } = require('../core/helpers');
const e = require('../core/elements');
const { MultiUsers } = require('../user/multiusers');

class EmojiPrivateChat extends MultiUsers {
  constructor(browser, context) {
    super(browser, context);
  }

  async emojiTestPrivateChat() {
    await openPrivateChat(this.modPage);
    await this.modPage.waitForSelector(e.hidePrivateChat);
    await sleep(500); // prevent a race condition when running on a deployed server
    // modPage send message
    await this.modPage.waitAndClick(e.emojiPickerButton);
    await this.modPage.waitAndClick(e.emojiSent);
    await this.modPage.waitAndClick(e.sendButton);
    await this.userPage.waitUntilHaveCountSelector(e.chatButton, 2);
    await this.userPage.waitAndClickElement(e.chatButton, 1);
    await this.userPage.waitForSelector(e.hidePrivateChat);
    // check sent messages 
    await this.modPage.hasText(e.chatUserMessageText, e.frequentlyUsedEmoji);
    await this.userPage.hasText(e.chatUserMessageText, e.frequentlyUsedEmoji);
    // userPage send message
    await this.userPage.waitAndClick(e.emojiPickerButton);
    await this.userPage.waitAndClick(e.emojiSent);
    await this.userPage.waitAndClick(e.sendButton);
    // check sent messages 
    await this.modPage.hasText(e.privateChat, e.frequentlyUsedEmoji);
    await this.userPage.hasText(e.privateChat, e.frequentlyUsedEmoji);
  }

  async emojiCloseChat() {
    await openPrivateChat(this.modPage);
    await this.modPage.waitUntilHaveCountSelector(e.chatButton, 2);
    const privateChatLocator = this.modPage.getLocatorByIndex(e.chatButton, -1);
    expect(privateChatLocator).toContainText(this.userPage.username);

    await this.modPage.type(e.chatBox, e.message1);
    await this.modPage.waitAndClick(e.sendButton);
    await this.userPage.waitUntilHaveCountSelector(e.chatButton, 2);
    await this.modPage.waitAndClick(e.closePrivateChat);
    await this.modPage.wasRemoved(e.hidePrivateChat);
    await this.modPage.waitUntilHaveCountSelector(e.chatButton, 1);
    const userChatCount = await this.userPage.getSelectorCount(e.chatButton);
    expect(userChatCount).toBe(2);
  }

  async chatDisabledUserLeaves() {
    await openPrivateChat(this.modPage);
    await this.modPage.waitForSelector(e.sendButton);
    await this.userPage.waitAndClick(e.optionsButton);
    await this.userPage.waitAndClick(e.logout);
    await this.modPage.hasElementDisabled(e.chatBox);
    await this.modPage.hasElementDisabled(e.sendButton);
  }
}

exports.EmojiPrivateChat = EmojiPrivateChat;