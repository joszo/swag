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
