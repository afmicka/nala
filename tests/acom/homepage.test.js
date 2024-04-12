import { expect, test } from '@playwright/test';
import { features } from '../../features/acom/homepage.spec.js';
import AcomHomePage from '../../selectors/acom/home.page.js';
import FedsHeader from '../../selectors/feds/feds.header.page.js';
import FedsFooter from '../../selectors/feds/feds.footer.page.js';

const miloLibs = process.env.MILO_LIBS || '';

let Acom;
test.beforeEach(async ({ page }) => { Acom = new AcomHomePage(page); });

test.describe('Acom Home page test suite', () => {
  // Verify Jarvis initialization on acom homepage
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    test.skip(!`${baseURL}`.match(/adobe.com/), 'gnav placeholders not available on milo outside Adobe network');
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
      await Header.headerContainer.waitFor({ state: 'visible', timeout: 30000 });
      await expect(Header.mainNavContainer).toBeVisible();
      await expect(Header.signInButton).toBeVisible();
      await expect(Acom.homepageBrick).toBeVisible();  
    });

    await test.step('Validate footer visibility', async () => {
      await expect(Footer.footerContainer).toBeVisible();  
      await expect(Footer.changeRegionContainer).toBeVisible();  
      await expect(Footer.featuredProductsContainer).toBeVisible();  
      await expect(Footer.socialContainer).toBeVisible();  
      await expect(Footer.privacyLink).toBeVisible();  
      await expect(Footer.legalContainer).toBeVisible();  
    });
  });

  //@Acom-TWP-Modal - Validate homepage rendering TWP modal
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    let testPage;
    if (!`${baseURL}`.match(/adobe.com/)) {
      testPage = `${baseURL}${features[2].path}${miloLibs}${features[2].browserParams}`
    } else {
      testPage = `${baseURL}${features[2].browserParams}`;
    }
    console.info('[Test Page]: ', testPage);

    await test.step('Go to Acom home twp page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Validate TWP modal rendering', async () => {
      await Acom.twpContainer.waitFor({ state: 'visible', timeout: 30000 });
      await expect(await Acom.twpCard).toBeVisible();  
      await expect(await Acom.subscriptionPanel).toBeVisible();  
      await expect(await Acom.twpPrice).toBeVisible();  
      await expect(await Acom.twpContinue).toBeVisible();  
    });
  });
});
