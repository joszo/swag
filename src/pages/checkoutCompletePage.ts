import BasePage from './basePage';
import { config } from '../commonData/envs';
import { paths } from '../commonData/paths';
import { Page } from '@playwright/test';

export default class CheckoutCompletePage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.elements = {
      ponyImg: page.locator('[class="pony_express"]'),
      backHomeButton: page.getByText('Back Home'),
    };
    this.url = new URL(paths.checkoutComplete, config.baseUrl);
  }

  verifyRedirectToCheckoutCompletePage() {
    this.shouldHaveUrl(paths.checkoutComplete);
  }

  async ponyShouldBeVisible() {
    await this.shouldBeVisible(this.elements.ponyImg);
  }

  async clickBackHomeButton() {
    await Promise.all([this.waitForNavigation, this.clickElement(this.elements.backHomeButton)]);
  }
}
