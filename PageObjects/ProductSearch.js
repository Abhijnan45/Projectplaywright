class ProductSearch{


constructor(page)
{
    this.page = page;
    this.products=page.locator('.card-body');
    this.productstext=page.locator('.card-body b');
    this.cart= page.locator("[routerlink*='cart']");
}

async search(ProductName)
{
    const tiltle = await this.productstext.allTextContents();
    console.log(tiltle);
    const count = await this.products.count();
    for (let i = 0; i < count; i++)
 {
    const name = await this.products.nth(i).locator('b').textContent();
    if (name.trim() === ProductName)
    {
      await this.products.nth(i).getByRole('button', { name: 'Add To Cart' }).click();
      break;
    }
  }

}

 async gotocart()
  {
    await this.cart.click();
  }

}
module.exports={ProductSearch};