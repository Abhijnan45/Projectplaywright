import { test, expect } from '@playwright/test';

test('Locators', async ({ page }) => {
  await page.goto('https://demoblaze.com/index.html');
  
  await page.locator('#login2').click();
  await page.locator('#loginusername').fill('blackstar123');
  await page.locator('#loginpassword').fill('blackstar');
  await page.locator('button:has-text("Log in")').click();

  await page.waitForTimeout(3000);
  page.waitForSelector('#nameofuser');

  const links = await page.$$('a');
  for(const link of links) {
    const text = await link.textContent();
    console.log(text);
  }

  await expect(page.locator('#nameofuser')).toHaveText('Welcome blackstar123');
});
