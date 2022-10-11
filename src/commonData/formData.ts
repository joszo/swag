import { CheckoutData } from '../types/checkoutData.type';
import { faker } from '@faker-js/faker';

export const checkoutData: CheckoutData = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  zipCode: faker.address.zipCode(),
};
