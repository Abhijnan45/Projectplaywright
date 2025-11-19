const { test, expect } = require('@playwright/test');

test('Home page', async ({ page }) => {
  await page.goto('https://www.youtube.com/');

  const pageTitle = await page.title();
  console.log('Page Title is:', pageTitle);

  await expect(page).toHaveTitle('YouTube');

  const pageURL = page.url();
  console.log('Page URL is:', pageURL);

  await expect(page).toHaveURL('https://www.youtube.com/');

  await page.close();
});
