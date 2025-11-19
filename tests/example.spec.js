import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('practice test',async ({page})=>{
   
  const mail =  "blackui@gmail.com";
  const pwd ="Black@123";
await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
;
await page.locator("#userEmail").fill(mail);
await page.locator("#userPassword").fill(pwd);
await page.locator("[value='Login']").click();
await page.waitForLoadState('networkidle');
const products = page.locator(".card-body");
await page.locator(".card-body b").first().textContent();
const titles = await products.locator("b").allTextContents();
console.log(titles);
})

test('loginpage',async ({page})=>{
const context = await page.context();
const newPage = await context.newPage();
await newPage.goto('https://rahulshettyacademy.com/loginpagePractise/');
await newPage.locator('#username').fill('rahulshettyacademy');
await newPage.locator('#password').fill('learning');
await newPage.locator('input[value="user"]').click();
await newPage.locator('#okayBtn').click();
await newPage.locator("select.form-control").selectOption('Consultant');
await newPage.locator('#terms').click();
await newPage.locator('#signInBtn').click();
await newPage.waitForLoadState('networkidle');
const title =await newPage.locator('.card-title a').first().textContent();
console.log(title);
await expect(newPage.locator('.card-title a').first()).toHaveText('iphone X');
})
;