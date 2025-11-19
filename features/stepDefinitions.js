const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../PageObjects/LoginPage.js');
const { ProductSearch } = require('../PageObjects/ProductSearch.js');
const { CartPage } = require('../PageObjects/CartPage.js');
const { CheckOutPage } = require('../PageObjects/CheckOutPage.spec.js');
const { OrderDetails } = require('../PageObjects/OrderDetails.js');

Given('when user login with {string} and {string}', async function (username, password) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goto();
  await loginPage.Login(username, password);
  await this.page.waitForLoadState('networkidle');
});

When('add the product to the cart and proceed to checkout', async function () {
  const productSearch = new ProductSearch(this.page);
  await productSearch.search('ZARA COAT 3');
  await productSearch.gotocart();
  await this.page.locator('div li').first().waitFor();
});

Then('User should be able to place the order successfully', async function () {
  const cartpage = new CartPage(this.page, 'ZARA COAT 3');
  await cartpage.gotochekout();
  const checkoutpage = new CheckOutPage(this.page);
  await checkoutpage.ProductDetails('blackui@gmail.com');
  await this.page.locator('h1').waitFor();
  const heading = await this.page.locator('h1').textContent();
  if (heading.includes('Thankyou for the order')) {
    console.log('Order placed successfully');
  }
});