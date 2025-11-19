const { test, expect, request } = require('@playwright/test');
const ApiUtilities = require('../Utilityfiles/ApiUtilities');
const fakepayload = { data: [], message: "No Orders" };

const loginPayload = {
  userEmail: "blackui@gmail.com",
  userPassword: "Black@123"
};

const orderPayload = {
  orders: [
    { country: "India", productOrderedId: "68a961719320a140fe1ca57c" }
  ]
};

let response1;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtilities = new ApiUtilities(apiContext, loginPayload);
  response1 = await apiUtilities.createOrder(orderPayload);
});

test('API test - verify login token', async () => {
  expect(response1.userToken).toBeTruthy();
});
test('Debug token value', async () => {
  console.log('Full response1:', response1);
});


test('Ecommerce test', async ({ page }) => {

  // 1️⃣ Inject token before the site loads
  await page.addInitScript(token => {
    window.localStorage.setItem('token', token);
  }, response1.userToken);

  // 2️⃣ Navigate after injecting
  await page.goto('https://rahulshettyacademy.com/client/');
  console.log('Token inside browser:', await page.evaluate(() => localStorage.getItem('token')));

  await page.waitForLoadState('networkidle');

  // 3️⃣ Now route the orders API
  await page.route(
    '**/get-orders-for-customer/*',
    async route => {
      const response = await page.request.fetch(route.request());
      const body = JSON.stringify(fakepayload);
      await route.fulfill({ response, body });
    }
  );

  // 4️⃣ Proceed with UI actions
  const ordersButton = page.getByRole('button', { name: 'ORDERS' });
  await expect(ordersButton).toBeVisible();
  await ordersButton.click();

  await page.waitForResponse('**/get-orders-for-customer/*');
  const noOrdersText = page.getByText('You have No Orders to show');
  await expect(noOrdersText).toBeVisible();
}
);
