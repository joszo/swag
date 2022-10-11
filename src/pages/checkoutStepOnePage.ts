import BasePage from './basePage';
import { CheckoutData } from '../types/checkoutData.type';
import { config } from '../commonData/config';
import { paths } from '../commonData/paths';
import { Page } from '@playwright/test';

export default class CheckoutStepOnePage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.elements = {
      firstNameInput: page.getByPlaceholder('First Name'),
      lastNameInput: page.getByPlaceholder('Last Name'),
      zipCodeInput: page.getByPlaceholder('Zip'),
      continueButton: page.getByText('Continue'),
    };
    this.url = new URL(paths.checkoutStepOne, config.baseUrl);
  }

  async openCheckoutPage() {
    await this.visit();
  }

  async verifyRedirectToCHeckoutStepOnePage() {
    await this.shouldHaveUrl(paths.checkoutStepOne);
  }

  async fillCheckoutData(object: CheckoutData) {
    await this.fillInput(this.elements.firstNameInput, object.firstName);
    await this.fillInput(this.elements.lastNameInput, object.lastName);
    await this.fillInput(this.elements.zipCodeInput, object.zipCode);
  }

  async clickContinueButton() {
    await Promise.all([this.waitForNavigation, this.clickElement(this.elements.continueButton)]);
  }
}
