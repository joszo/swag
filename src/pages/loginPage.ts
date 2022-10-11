import BasePage from './basePage';
import { config } from '../commonData/envs';
import { paths } from '../commonData/paths';
import { Page } from '@playwright/test';

export default class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.elements = {
      usernameInput: page.locator('[data-test="username"]'),
      passwordInput: page.locator('[data-test="password"]'),
      loginButton: page.locator('[data-test="login-button"]'),
      errorMessage: page.locator('[data-test="error"]'),
    };
    this.url = new URL(paths.basic, config.baseUrl);
  }

  async openLoginPage() {
    await this.visit();
  }

  async fillLoginData(username: string, password: string) {
    await this.fillInput(this.elements.usernameInput, username);
    await this.fillInput(this.elements.passwordInput, password);
  }

  async clickLoginAndWaitForNavigation() {
    await Promise.all([this.waitForNavigation(), this.clickLoginButton()]);
  }
  async clickLoginButton() {
    await this.clickElement(this.elements.loginButton);
  }

  async saveStorage() {
    await this.storeStorageState('./src/fixtures/storageState.json');
  }

  async shouldDisplayErrorValidation(validationMessage: string) {
    await this.shouldHaveText(this.elements.errorMessage, validationMessage);
  }
}
