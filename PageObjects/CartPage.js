class CartPage{


constructor(page, ProductName)
{
    this.page = page;
    this.text=page.locator(`h3:has-text("${ProductName}")`);
    this.checkoutbutton=page.locator("//button[.='Checkout']");
}

async gotochekout()
{
      
      await this.checkoutbutton.click();
     
}
}
module.exports={CartPage};