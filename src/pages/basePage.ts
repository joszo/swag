import { config } from '../commonData/config';
import { paths } from '../commonData/paths';
import { Elements } from '../types/elements.type';
import { Page, Locator, expect } from '@playwright/test';

export default class BasePage {
  page: Page;
  elements: Elements;
  url: URL;

  constructor(page: Page) {
    this.page = page;
    this.elements = {};
    this.url = new URL(paths.basic, config.baseUrl);
  }

  // INFO: Actions
  async visit() {
    await this.page.goto(this.url.href);
  }

  async gotoUrl(url: string) {
    await this.page.goto(url);
  }

  async waitForNavigation() {
    await this.page.waitForNavigation();
  }

  async clickElement(element: Locator, nthElement?: number) {
    nthElement !== undefined ? await element.nth(nthElement).click() : await element.click();
  }

  async fillInput(element: Locator, inputText: string) {
    await element.fill(inputText);
  }

  async countElements(element: Locator): Promise<number> {
    return element.count();
  }

  async getInnerText(element: Locator): Promise<string> {
    return element.innerText();
  }

  async selectOption(element: Locator, option: string) {
    await element.selectOption(option);
  }

  // INFO: Assertions
  async shouldBeVisible(element: Locator) {
    await expect(element).toBeVisible();
  }

  async shouldNotBeVisible(element: Locator) {
    await expect(element).not.toBeVisible();
  }

  async shouldHaveText(element: Locator, elementText: string) {
    await expect(element).toHaveText(elementText);
  }

  async shouldEqual(element: unknown, equalValue: unknown) {
    expect(element).toEqual(equalValue);
  }

  async shouldEqualInnerText(element: Locator, equalValue: string) {
    expect(await this.getInnerText(element)).toEqual(equalValue);
  }

  shouldHaveUrl(matchString: string | RegExp) {
    expect(this.page).toHaveURL(matchString);
  }

  // INFO: Helpers
  async storeStorageState(pathToFileName: string) {
    await this.page.context().storageState({ path: pathToFileName });
  }

  async getAmountValue(element: Locator) {
    const innerText = await this.getInnerText(element);
    const regex = /\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})/;

    return Number(innerText.match(regex)![0]);
  }

  async getAllPricesArray(element: Locator): Promise<number[]> {
    const productPrices = [];
    const numberOfElements = await this.countElements(element);

    for (let i = 0; i < numberOfElements; i++) {
      productPrices.push(await this.getAmountValue(element.nth(i)));
    }

    return productPrices;
  }
}
