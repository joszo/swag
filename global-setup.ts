import { config as testingConfig, users } from './src/commonData/envs';
import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(testingConfig.baseUrl);
  await page.locator('[data-test="username"]').fill(users.standardUser);
  await page.locator('[data-test="password"]').fill(users.userPassword);
  await page.locator('[data-test="login-button"]').click();
  await page.context().storageState({ path: './src/fixtures/storageState.json' });
  await browser.close();
}

export default globalSetup;
