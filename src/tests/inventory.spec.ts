import { test } from '../fixtures/testFixture';

test.use({ storageState: './src/fixtures/storageState.json' });

test.describe('As a authorized user', () => {
  test('I want to add product to cart and remove product from cart ', async ({ inventoryPage }) => {
    // GIVEN
    const numberAddToCartButtons = 6;
    const numberRemoveFromCartButtons = 0;

    await inventoryPage.openInventoryPage();
    await inventoryPage.shoppingBadgeShouldNotBeVisible();
    await inventoryPage.verifyAddToCartButtons(numberAddToCartButtons);
    await inventoryPage.verifyRemoveFromCartButtons(numberRemoveFromCartButtons);

    // WHEN
    await inventoryPage.addToCartProduct(0);

    // THEN
    await inventoryPage.shoppingBadgeShouldBeVisible();
    await inventoryPage.verifyAddToCartButtons(numberAddToCartButtons - 1);
    await inventoryPage.verifyRemoveFromCartButtons(numberRemoveFromCartButtons + 1);

    // AND
    await inventoryPage.verifyShoppingCartBadgeNumber('1');
    await inventoryPage.addToCartProduct(0);
    await inventoryPage.verifyAddToCartButtons(numberAddToCartButtons - 2);
    await inventoryPage.verifyRemoveFromCartButtons(numberRemoveFromCartButtons + 2);
    await inventoryPage.verifyShoppingCartBadgeNumber('2');
  });
});
