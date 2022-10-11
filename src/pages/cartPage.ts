import BasePage from './basePage';
import { config } from '../commonData/envs';
import { paths } from '../commonData/paths';
import { Page } from '@playwright/test';

export default class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.elements = {
      cartItem: page.locator('[class="cart_item"]'),
      checkoutButton: page.getByText('Checkout'),
    };
    this.url = new URL(paths.cart, config.baseUrl);
  }

  async openCartPage() {
    await this.visit();
  }

  async countCartItemValues() {
    return this.countElements(this.elements.cartItem);
  }

  async clickCheckoutButton() {
    await Promise.all([this.waitForNavigation(), this.clickElement(this.elements.checkoutButton)]);
  }
}
