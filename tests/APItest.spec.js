import { test, expect } from '@playwright/test';
let WebContext;
const email = 'blackui@gmail.com';
test.beforeAll(async({browser}) =>{
     
    const context = await browser.newContext();
    const page = await context.newPage();
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.getByPlaceholder('email@example.com').fill(email);
  await page.getByPlaceholder('enter your passsword').fill('Black@123');
  await page.locator('#login').click();
  await page.waitForLoadState('networkidle');
  await context.storageState({path:'state.json'});
  WebContext = await browser.newContext({storageState:'state.json'});

})

test('ecommerce test', async () => {
  const ProductName = 'ZARA COAT 3';
  const page = await WebContext.newPage();
   await page.goto('https://rahulshettyacademy.com/client/');
  const products = page.locator('.card-body');
  await products.first().waitFor();
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    const name = await products.nth(i).locator('b').textContent();
    if (name.trim() === ProductName) {
      await products.nth(i).getByRole('button', { name: 'Add To Cart' }).click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  await page.locator('div li').first().waitFor();

  const isVisible = await page.locator(`h3:has-text("${ProductName}")`).isVisible();
  expect(isVisible).toBeTruthy();

  await page.locator("//button[.='Checkout']").click();
  await page.waitForLoadState('networkidle');

  await page.locator("(//select[@class='input ddl'])[1]").selectOption({ label: '02' });
  await page.locator("(//select[@class='input ddl'])[2]").selectOption({ label: '09' });
  await page.locator("(//input[@type='text'])[3]").fill('black');

  await page.getByPlaceholder('Select Country').pressSequentially('ind');
  const dropdownOptions = page.locator('.ta-results');
  await dropdownOptions.first().waitFor();

  const optionsCount = await dropdownOptions.locator('button').count();
  for (let i = 0; i < optionsCount; i++) {
    const button = dropdownOptions.locator('button').nth(i);
    const text = await button.textContent();
    if (text.trim() === 'India') {
      await button.scrollIntoViewIfNeeded();
      await button.waitFor({ state: 'visible' });
      await button.click();
      break;
    }
  }

  await expect(page.getByText(email)).toBeVisible();
  await page.locator('.action__submit').scrollIntoViewIfNeeded();
  await page.locator('.action__submit').click();

  await expect(page.locator('h1')).toHaveText('Thankyou for the order.');

  const orderID = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
  console.log('Order ID:', orderID);

  await page.locator('.btn.btn-custom').filter({ hasText: 'ORDERS' }).click();

  await page.locator('tbody').waitFor();
  const row = page.locator('tbody tr');
  const rowCount = await row.count();

  for (let i = 0; i < rowCount; i++) {
    const orderIDlocator = await row.nth(i).locator('th').textContent();
    if (orderIDlocator && orderID.includes(orderIDlocator.trim())) {
      await row.nth(i).getByText('View').click();
      //await row.filter({ hasText: orderID }).getByText('View').click();
      break;
    }
  }

  const orderIDDetails = await page.locator('.col-text').textContent();
  expect(orderID.trim()).toContain(orderIDDetails.trim());
});
