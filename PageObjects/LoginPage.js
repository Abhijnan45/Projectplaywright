class LoginPage{

  constructor(page)
  {
    this.page = page;
  this.username = page.getByPlaceholder('email@example.com');
   this.password =page.getByPlaceholder('enter your passsword');  
    this.button = page.locator('#login');
}

async goto()
{
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login',{waitUntil:'networkidle'});
}
async Login(username,password)
{
   
   await this.username.fill(username);
    await this.password.fill(password);
    await this.button.click();

}
}
module.exports={LoginPage};
