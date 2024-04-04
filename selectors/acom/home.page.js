export default class AcomHomePage {
    constructor(page) {
      this.page = page;
  
      // Gnav menu locators
      this.helpSupportMenu = page.locator('//*[contains(@daa-ll,"Help Support")]');
      this.contactUsCTA = page.locator('a[href$="#open-jarvis-chat"]');

      // Jarvis popup chat
      this.jarvisContainer = page.locator('iframe.adbmsgContentIframe');

      // Homepage selectors
      this.homepageBrick = page.locator('//div[contains(@daa-lh,"homepage-brick")]');
      
    }
  }
