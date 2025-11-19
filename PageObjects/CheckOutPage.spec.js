class CheckOutPage{

    constructor(page)
        {
            this.page=page;
            this.opt1=page.locator("(//select[@class='input ddl'])[1]");
            this.opt2=page.locator("(//select[@class='input ddl'])[2]");
            this.namefield=page.locator("(//input[@type='text'])[3]");
            this.country=page.getByPlaceholder('Select Country');
            this.dropdownOptions = page.locator('.ta-results');  
            this.submitbutton=page.locator('.action__submit');      
        }

  async ProductDetails(username)
{

  await this.opt1.selectOption({ label: '02' });
  await this.opt2.selectOption({ label: '09' });
  await this.namefield.fill('black');
  await this.country.pressSequentially('ind');
  await this.dropdownOptions.first().waitFor();

  const optionsCount = await this.dropdownOptions.locator('button').count();
  for (let i = 0; i < optionsCount; i++) 
{
    const button = this.dropdownOptions.locator('button').nth(i);
    const text = await button.textContent();
    if (text.trim() === 'India') {
      await button.scrollIntoViewIfNeeded();
      await button.waitFor({ state: 'visible' });
      await button.click();
      break;
    }
}

 // await expect(page.getByText(username)).toBeVisible();
  await this.submitbutton.scrollIntoViewIfNeeded();
  await this.submitbutton.click();

    }}
module.exports={CheckOutPage};