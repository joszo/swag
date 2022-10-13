import { checkoutFormData } from '../commonData/testData';
import { test } from '../fixtures/testFixture';

test.use({ storageState: './src/fixtures/storageState.json' });

test.describe('As a authorized user', () => {
  test('I want to proceed with checkout process', async ({
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
    inventoryPage,
    page,
  }) => {
    /*     INFO: FIXME: 
        Playwright doesn't support different way to inject the values, values need to hardcoded
        Feel free to change array in string e.g '[0,0]' max = 6, min = 0
        Remember to change cartItemsNumber validation e.g await cartPage.shouldEqual(cartItemsNumber, 2);
 */
    // GIVEN
    await page.addInitScript(() => {
      return window.localStorage.setItem('cart-contents', '[0,1,2,0]');
      // FIXME: Failing scenario: [JIRA-03](https://sample.jira.com/jira-03)
      // return window.localStorage.setItem('cart-contents', '[4,1,5,2,0]');
    });

    // WHEN
    await test.step('Perform action on cartPage', async () => {
      await cartPage.openCartPage();
      const cartItemsNumber = await cartPage.countCartItemValues();

      await cartPage.shouldEqual(cartItemsNumber, 4);
      await cartPage.clickCheckoutButton();
    });

    // AND
    await test.step('Perform action on checkoutStepOnePage', async () => {
      checkoutStepOnePage.verifyRedirectToCHeckoutStepOnePage();
      await checkoutStepOnePage.fillCheckoutData(checkoutFormData);
      await checkoutStepOnePage.clickContinueButton();
    });

    // THEN
    await test.step('Perform action on checkoutStepTwoPage', async () => {
      checkoutStepTwoPage.verifyRedirectToCheckoutStepTwoPage();
      await checkoutStepTwoPage.verifyAmounts();
      await checkoutStepTwoPage.clickFinishButton();
    });

    // AND
    await test.step('Perform action on checkoutComplete', async () => {
      checkoutCompletePage.verifyRedirectToCheckoutCompletePage();
      // INFO: I know that more validation can be done here, but this is only recruitment task 😊
      await checkoutCompletePage.ponyShouldBeVisible();
      await checkoutCompletePage.clickBackHomeButton();
    });

    // AND
    await test.step('Perform action on inventory', async () => {
      inventoryPage.verifyRedirectToInventoryPage();
    });
  });
});
