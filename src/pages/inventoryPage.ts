import BasePage from './basePage';
import { config } from '../commonData/envs';
import { paths } from '../commonData/paths';
import { Page, Locator } from '@playwright/test';

export default class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.elements = {
      addToCartButton: page.getByText('Add to cart'),
      removeFromCartButton: page.getByText('Remove'),
      shoppingCartBadge: page.locator('[class="shopping_cart_badge"]'),
      productSort: page.locator('[data-test="product_sort_container"]'),
      productPrice: page.locator('[class="inventory_item_price"]'),
      productNames: page.locator('[class="inventory_item_name"]'),
    };
    this.url = new URL(paths.inventory, config.baseUrl);
  }

  async openInventoryPage() {
    await this.visit();
  }

  async selectProductSortingMethod(sortOption: string) {
    await this.selectOption(this.elements.productSort, sortOption);
  }

  async getPricesArray(): Promise<number[]> {
    return this.getAllPricesArray(this.elements.productPrice);
  }

  async getNamesArray() {
    const element = this.elements.productNames;
    const numberOfElements = await this.countElements(element);
    const productNames = [];

    for (let i = 0; i < numberOfElements; i++) {
      productNames.push(await this.getInnerText(element.nth(i)));
    }

    return productNames;
  }

  verifyRedirectToInventoryPage() {
    this.shouldHaveUrl(paths.inventory);
  }

  async shoppingBadgeShouldNotBeVisible() {
    await this.shouldNotBeVisible(this.elements.shoppingCartBadge);
  }

  async shoppingBadgeShouldBeVisible() {
    await this.shouldBeVisible(this.elements.shoppingCartBadge);
  }

  private async verifyNumberOfButtons(element: Locator, expectedNumberOfElements: number) {
    const elementCount = await this.countElements(element);
    this.shouldEqual(elementCount, expectedNumberOfElements);
  }

  async verifyRemoveFromCartButtons(expectedNumberOfElements: number) {
    this.verifyNumberOfButtons(this.elements.removeFromCartButton, expectedNumberOfElements);
  }

  async verifyAddToCartButtons(expectedNumberOfElements: number) {
    this.verifyNumberOfButtons(this.elements.addToCartButton, expectedNumberOfElements);
  }

  async addToCartProduct(indexOfProduct: number) {
    await this.clickElement(this.elements.addToCartButton, indexOfProduct);
  }

  async verifyShoppingCartBadgeNumber(shoppingCartBadgeNumber: string) {
    const innerText: string = await this.getInnerText(this.elements.shoppingCartBadge);
    this.shouldEqual(innerText, shoppingCartBadgeNumber);
  }
}
