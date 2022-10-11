import { users } from '../commonData/users';
import { dictionary } from '../commonData/dictionary';
import { paths } from '../commonData/paths';
import { test } from '../fixtures/testFixture';

test.describe('As unauthorized user ', () => {
  test('I want to login into swag app as standard user @smoke', async ({ loginPage }) => {
    // GIVEN
    await loginPage.openLoginPage();

    // WHEN
    await loginPage.fillLoginData(users.standardUser, users.userPassword);

    // AND
    await loginPage.clickLoginAndWaitForNavigation();

    // THEN
    await loginPage.shouldHaveUrl(/.*inventory/);
  });

  test('I want to login into swag app as locked out user @smoke', async ({ loginPage }) => {
    // GIVEN
    await loginPage.openLoginPage();

    // WHEN
    await loginPage.fillLoginData(users.lockedOutUser, users.userPassword);

    // AND
    await loginPage.clickLoginButton();

    // THEN
    await loginPage.shouldHaveUrl('/');
    await loginPage.shouldDisplayErrorValidation(dictionary.errorMessages.lockedOutUser);
  });

  const pathsArray: string[] = Object.values(paths).filter((path) => path !== paths.basic);

  pathsArray.forEach((path) => {
    test(`I want to visit ${path} path`, async ({ loginPage }) => {
      // WHEN
      await loginPage.gotoUrl(path);

      // THEN
      await loginPage.shouldDisplayErrorValidation(dictionary.errorMessages.notAuthorized(path));
    });
  });
});
