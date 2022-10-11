### Install dependencies
As in every node project run `npm install` or `npm i`.

### Run all tests
To run all spec files in terminal use `npm run test`.

### Run tests with specific tags
To run specific set of tests e.g smoke in title description add @myTag and then run `npm run test --grep @myTag`.

### Run spec file
To run specific file in terminal use `npm run test tests/testingPage.spec.ts`.

### Show reports
After all runs in `playwright-report` folder is created index.html with report. To show report in browser in terminal use `npm run report`.

### Formatting and linter
To format project use `npm run format`. To run linter and verify code use `npm run lint`.

### Different browser
If you would like to run test on different browsers in `playwright.config.ts` find projects section, and add/enable other browsers. 

### Known Problems:
1. `performanceGlitchUser` has problems with 'to long to take' actions on page reported [JIRA-01](https://sample.jira.com/jira-01)
2. Each user can go to checkout without any products in cart reported [JIRA-02](https://sample.jira.com/jira-02)
3. Incorrect rounding on /checkout-step-two.html, local storage cart-contents [4,1,5,2,0] or [4,1,5,3,0] added to cart [JIRA-03](https://sample.jira.com/jira-03)
4. Validation on /checkout-step-one.html is highlight for correct fields [JIRA-04](https://sample.jira.com/jira-04)
5. `problemUser` has the same images for all products [JIRA-05](https://sample.jira.com/jira-05)
6. `problemUser` cannot remove product from main page [JIRA-06](https://sample.jira.com/jira-06)
7. `problemUser` cannot provide last name on /checkout-step-one.html last name overrides first name field [JIRA-07](https://sample.jira.com/jira-07)
