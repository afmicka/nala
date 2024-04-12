export default class AcomHomePage {
    constructor(page) {
      this.page = page;
  
      // Gnav menu locators
      this.helpSupportMenu = page.locator('//*[contains(@daa-ll,"Help Support")]');
      this.contactUsCTA = page.locator('a[href$="#open-jarvis-chat"]');

      // Jarvis popup chat
      this.jarvisContainer = page.locator('iframe.adbmsgContentIframe');

      // Homepage selectors
      this.homepageBrick = page.locator('//div[contains(@daa-lh,"homepage-brick")]').first();
      this.twpContainer = this.page.frameLocator('iframe').first().locator('.content');
      this.twpCard = this.page.frameLocator('iframe').first().locator('.twp-card div[daa-lh="individual_all_apps_card"]');
      this.twpPrice = this.page.frameLocator('iframe').first().locator('.price').first();
      this.twpContinue = this.page.frameLocator('iframe').first().locator('.subscription-panel-continue-button');
      this.subscriptionPanel = this.page.frameLocator('iframe').first().locator('.subscription-panel');
    }
  }
