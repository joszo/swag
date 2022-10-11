import BasePage from './basePage';
import { config } from '../commonData/config';
import { paths } from '../commonData/paths';
import { Page } from '@playwright/test';

export default class CheckoutStepTwoPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.elements = {
      itemAmount: page.locator('[class="inventory_item_price"]'),
      subTotalAmount: page.locator('.summary_subtotal_label'),
      taxAmount: page.locator('.summary_tax_label'),
      totalAmount: page.locator('.summary_total_label'),
      finishButton: page.getByText('Finish'),
    };
    this.url = new URL(paths.checkoutStepTwo, config.baseUrl);
  }

  async verifyRedirectToCheckoutStepTwoPage() {
    await this.shouldHaveUrl(paths.checkoutStepTwo);
  }

  private async sumAllProductsInCart() {
    const itemPrices = await this.getAllPricesArray(this.elements.itemAmount);

    return itemPrices.reduce((pv, cv) => pv + cv);
  }

  async verifyAmounts() {
    const sumOfPrices = await this.sumAllProductsInCart();
    const subTotalAmount = await this.getAmountValue(this.elements.subTotalAmount);
    const taxAmount = await this.getAmountValue(this.elements.taxAmount);
    const totalAmount = await this.getAmountValue(this.elements.totalAmount);

    await this.shouldEqual(subTotalAmount, sumOfPrices);
    await this.shouldEqual(totalAmount, Number((sumOfPrices + taxAmount).toFixed(2)));
  }

  async clickFinishButton() {
    await Promise.all([this.waitForNavigation(), this.clickElement(this.elements.finishButton)]);
  }
}
