import { sortTestData } from '../commonData/testData';
import { test } from '../fixtures/testFixture';

test.use({ storageState: './src/fixtures/storageState.json' });

const testCases = [
  {
    name: 'Low-High',
    sortOption: 'lohi',
    expectedValue: [...sortTestData.pricesArray.sort((a, b) => a - b)],
    isPriceTest: true,
  },
  {
    name: 'High-Low',
    sortOption: 'hilo',
    expectedValue: [...sortTestData.pricesArray.sort((a, b) => b - a)],
    isPriceTest: true,
  },
  {
    name: 'A-Z',
    sortOption: 'az',
    expectedValue: [...sortTestData.namesArray.sort((a, b) => a.localeCompare(b))],
    isPriceTest: false,
  },
  {
    name: 'Z-A',
    sortOption: 'za',
    expectedValue: [...sortTestData.namesArray.sort((a, b) => b.localeCompare(a))],
    isPriceTest: false,
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
    const result = testCase.isPriceTest
      ? await inventoryPage.getPricesArray()
      : await inventoryPage.getNamesArray();

    // THEN
    await inventoryPage.shouldEqual(result, testCase.expectedValue);
  });
});
