Feature: ordercreation

    Scenario: placing an order
    Given  when user login with "blackui@gmail.com" and "Black@123" 
    When  add the product to the cart and proceed to checkout
    Then  User should be able to place the order successfully