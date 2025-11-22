import { test, expect } from '@playwright/test';
import{LoginPage} from '../PageObjects/LoginPage.js';
import{ProductSearch} from '../PageObjects/ProductSearch.js';
import{CartPage} from '../PageObjects/CartPage.js';
import { CheckOutPage } from '../PageObjects/CheckOutPage.spec.js';
import { OrderDetails } from '../PageObjects/OrderDetails.js';
const data1 = JSON.parse(JSON.stringify(require('../datadriven/DATA.json')));
for(const data of data1){

test(`ecommerce test ${data.ProductName}`, async ({ page }) => {
 
  const loginPage= new LoginPage(page);
  await loginPage.goto();
  await loginPage.Login(data.username,data.password);
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('.card-body');
  const productsearch = new ProductSearch(page);
  await productsearch.search(data.ProductName);
  await productsearch.gotocart();
  await page.locator('div li').first().waitFor();
  const cartpage = new CartPage(page,data.ProductName);
  await expect(cartpage.text).toBeVisible();
  await cartpage.gotochekout();
  const checkoutpage = new CheckOutPage(page);
  await checkoutpage.ProductDetails(data.username);
  
  await expect(page.locator('h1')).toHaveText('Thankyou for the order.');
  const orderDetails = new OrderDetails(page);
  const {orderID , orderIDDetails } = await orderDetails.Ordervalidation();
  expect(orderID.trim()).toContain(orderIDDetails.trim());

});

};