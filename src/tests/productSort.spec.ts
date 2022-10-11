import { testData } from '../commonData/testData';
import { test } from '../fixtures/testFixture';

test.use({ storageState: './src/fixtures/storageState.json' });

const testCases = [
  {
    name: 'Low-High',
    sortOption: 'lohi',
    expectedValue: [...testData.pricesArray.sort((a, b) => a - b)],
    isPrice: true,
  },
  {
    name: 'High-Low',
    sortOption: 'hilo',
    expectedValue: [...testData.pricesArray.sort((a, b) => b - a)],
    isPrice: true,
  },
  {
    name: 'A-Z',
    sortOption: 'az',
    expectedValue: [...testData.namesArray.sort((a, b) => a.localeCompare(b))],
    isPrice: false,
  },
  {
    name: 'Z-A',
    sortOption: 'za',
    expectedValue: [...testData.namesArray.sort((a, b) => b.localeCompare(a))],
    isPrice: false,
  },
];

testCases.forEach((testCase) => {
  test(`As a authorized user I want sorting products by ${testCase.name} option`, async ({
    inventoryPage,
  }) => {
    // GIVEN
    await inventoryPage.openInventoryPage();

    // WHEN
    await inventoryPage.selectProductSortingMethod(testCase.sortOption);

    // AND
    const result = testCase.isPrice
      ? await inventoryPage.getPricesArray()
      : await inventoryPage.getNamesArray();

    // THEN
    await inventoryPage.shouldEqual(result, testCase.expectedValue);
  });
});
