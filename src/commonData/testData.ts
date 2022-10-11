import { CheckoutData } from '../types/checkoutData.type';
import { faker } from '@faker-js/faker';

export const sortTestData = {
  pricesArray: [49.99, 7.99, 15.99, 9.99, 29.99, 15.99],
  namesArray: [
    'Sauce Labs Backpack',
    'Sauce Labs Onesie',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Test.allTheThings() T-Shirt (Red)',
    'Sauce Labs Fleece Jacket',
  ],
};

export const checkoutFormData: CheckoutData = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  zipCode: faker.address.zipCode(),
};

const validationError = (fieldName: string) => `Error: ${fieldName} is required`;

export const dictionary = {
  errorMessages: {
    notAuthorized: (url: string) =>
      `Epic sadface: You can only access '${url}' when you are logged in.`,
    lockedOutUser: 'Epic sadface: Sorry, this user has been locked out.',
  },
  validationError: {
    firstNameValidation: validationError('First Name'),
    lastNameValidation: validationError('Last Name'),
    postalCodeValidation: validationError('Postal Code'),
  },
};
