import { expect, test } from '@playwright/test';
import { features } from '../../features/acom/homepage.spec.js';
import AcomHomePage from '../../selectors/acom/home.page.js';
import FedsHeader from '../../selectors/feds/feds.header.page.js';
import FedsFooter from '../../selectors/feds/feds.footer.page.js';

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Acom Home page test suite', () => {
  // Verify Jarvis initialization on acom homepage
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    test.skip(!`${baseURL}`.match(/adobe.com/), 'gnav placeholders not available on milo outside Adobe network');
    const Acom = new AcomHomePage(page);
    const testPage = `${baseURL}${features[0].browserParams}`;
    console.info('[Test Page]: ', testPage);

    await test.step('Go to Acom home page', async () => {
      const requestGnavPromise = page.waitForResponse(response => response.url().includes('mainNav.js'));
      await page.goto(testPage);
      await expect(page).toHaveURL(testPage);
      await requestGnavPromise;
    });

    await test.step('Click Help & Support from the main menu', async () => {
      await expect(Acom.helpSupportMenu).toBeVisible();  
      await Acom.helpSupportMenu.click();
    });

    await test.step('Initialize Jarvis', async () => {
      await expect(Acom.contactUsCTA).toBeVisible();
      // page does not load jarvis functionality fast enough 
      // resulting in navigating to old helpx page instead of triggering jarvis popup
      await page.waitForTimeout(1000);
      await Acom.contactUsCTA.click();
      await expect(Acom.jarvisContainer).toBeVisible({timeout: 15000});
    });
  });

  //@Acom-Smoke - Validate homepage rendering
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    const Acom = new AcomHomePage(page);
    const Header = new FedsHeader(page);
    const Footer = new FedsFooter(page);
    let testPage;
    if (!`${baseURL}`.match(/adobe.com/)) {
      testPage = `${baseURL}${features[1].path}${miloLibs}`
    } else {
      testPage = `${baseURL}${features[1].browserParams}`;
    }
    console.info('[Test Page]: ', testPage);

    await test.step('Go to Acom home page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Validate header visibility', async () => {
      await expect(Header.headerContainer).toBeVisible();  
      await expect(Header.mainNavContainer).toBeVisible();
      if (`${baseURL}`.match(/adobe.com/)) {
        await expect(Header.signInButton).toBeVisible();
      }  
      await expect(Acom.homepageBrick).toBeVisible();  
    });

    await test.step('Validate footer visibility', async () => {
      await expect(Footer.footerContainer).toBeVisible();  
      await expect(Footer.changeRegionContainer).toBeVisible();  
      await expect(Footer.featuredProductsContainer).toBeVisible();  
      await expect(Footer.socialContainer).toBeVisible();  
      await expect(Footer.privacyLink).toBeVisible();  
      await expect(Footer.legalCopyright).toBeVisible();  
    });
  });

});
