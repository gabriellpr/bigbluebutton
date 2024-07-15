const { default: test } = require('@playwright/test');
const Page = require('../core/page');
const { setStatus } = require('./util');
const { waitAndClearNotification, waitAndClearDefaultPresentationNotification } = require('../notifications/util');
const e = require('../core/elements');
const { getSettings } = require('../core/settings');

class Status extends Page {
  constructor(browser, page) {
    super(browser, page);
  }

  async changeUserStatus() {
    const { userStatusEnabled } = getSettings();

    if(!userStatusEnabled) {
      await this.waitAndClick(e.currentUser);
      return this.wasRemoved(e.setStatus, 'should not display set status for');
    }
    await setStatus(this, e.applaud);
    await this.waitForSelector(e.smallToastMsg);
    await this.checkElement(e.applauseIcon);

    await waitAndClearNotification(this);
    await setStatus(this, e.away);
    await this.waitForSelector(e.smallToastMsg);
    await this.checkElement(e.awayIcon);
  }

  async mobileTagName() {
    await this.waitAndClick(e.userListToggleBtn);
    await this.waitForSelector(e.currentUser);
    await this.hasElement(e.mobileUser, 'should display the mobile user');
  }
}

exports.Status = Status;
