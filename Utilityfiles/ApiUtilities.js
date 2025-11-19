
class ApiUtilities
{
  constructor(apiContext,loginPayload)
  {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

   async getToken()
   {
  const response = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      { data: this.loginPayload }
    );
  
   // expect(response.ok()).toBeTruthy();
  
    const jsonResponse = await response.json();
    const userToken = jsonResponse.token;
    console.log("User Token:", userToken);
    return userToken;

   }

   async createOrder(orderPayload)
   {
    let response1 = {};
    response1.userToken = await this.getToken();
    const orderResponse = await this.apiContext.post
    (
      'https://rahulshettyacademy.com/api/ecom/order/create-order',
    
       {data: orderPayload,
        headers:
        {
          'Authorization': response1.userToken,
          'Content-Type': 'application/json'
      }, 
      })
    
     const orderJsonResponse = await orderResponse.json();
     console.log("Order Response:", orderJsonResponse);
     const orderID = orderJsonResponse.orders[0];
     response1.orderID=orderID;
     return response1;
    
   }


}
module.exports = ApiUtilities;