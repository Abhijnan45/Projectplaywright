class OrderDetails{
    
 constructor(page){
   this.page=page;
   this.order=page.locator('.em-spacer-1 .ng-star-inserted');
   this.orderbutton=page.locator('.btn.btn-custom').filter({ hasText: 'ORDERS' });
   this.row=page.locator('tbody tr');
   this.rowtable=page.locator('tbody');
   this.coltext=page.locator('.col-text');
 }

async Ordervalidation(){
    
      const orderID = await this.order.textContent();
      console.log('Order ID:', orderID);
    
      await this.orderbutton.click();
    
      await this.rowtable.waitFor();
      const row = this.row;
      const rowCount = await row.count();
    
      for (let i = 0; i < rowCount; i++) {
        const orderIDlocator = await row.nth(i).locator('th').textContent();
        if (orderIDlocator && orderID.includes(orderIDlocator.trim())) {
          await row.nth(i).getByText('View').click();
          //await row.filter({ hasText: orderID }).getByText('View').click();
          break;
        }
      }
    
      const orderIDDetails = await this.coltext.textContent();
      return { orderID, orderIDDetails };
 }





}
module.exports={OrderDetails};