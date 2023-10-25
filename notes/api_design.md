# API Design

Follows REST principles and includes endpoints for managing products and orders.

## Product Management:

1. **Create a New Product**
    - **HTTP Method:** POST
    - **Endpoint:** `/api/products`
    - **Request Body:**
      ```json
      {
        "name": "Product Name",
        "price": 19.99,
        "stockQuantity": 100
      }
      ```
    - **Response:** Returns the created product with its unique identifier.
      ```json
      {
        "productId": 1,
        "name": "Product Name",
        "price": 19.99,
        "stockQuantity": 100
      }
      ```

2. **Get All Products**
    - **HTTP Method:** GET
    - **Endpoint:** `/api/products`
    - **Response:** Returns a list of all products.
      ```json
      [
        {
          "productId": 1,
          "name": "Product 1",
          "price": 19.99,
          "stockQuantity": 100
        },
        {
          "productId": 2,
          "name": "Product 2",
          "price": 29.99,
          "stockQuantity": 50
        },
        // Other products...
      ]
      ```

3. **Get a Single Product**
    - **HTTP Method:** GET
    - **Endpoint:** `/api/products/{productId}`
    - **Response:** Returns information about a specific product.
      ```json
      {
        "productId": 1,
        "name": "Product 1",
        "price": 19.99,
        "stockQuantity": 100
      }
      ```

4. **Update a Product**
    - **HTTP Method:** PUT
    - **Endpoint:** `/api/products/{productId}`
    - **Request Body:** Provide the updated product data.
      ```json
      {
        "name": "Updated Product Name",
        "price": 24.99,
        "stockQuantity": 80
      }
      ```
    - **Response:** Returns the updated product.
      ```json
      {
        "productId": 1,
        "name": "Updated Product Name",
        "price": 24.99,
        "stockQuantity": 80
      }
      ```

## Order Management:

1. **Create a New Order**
    - **HTTP Method:** POST
    - **Endpoint:** `/api/orders`
    - **Request Body:**
      ```json
      {
        "customerName": "John Doe",
        "orderItems": [
          {
            "productId": 1,
            "orderQuantity": 3
          },
          {
            "productId": 2,
            "orderQuantity": 2
          }
        ]
      }
      ```
    - **Response:** Returns the created order with its unique identifier.
      ```json
      {
        "orderId": 1,
        "orderItems": [
          {
            "productId": 1,
            "orderQuantity": 3
          },
          {
            "productId": 2,
            "orderQuantity": 2
          }
        ],
        "customerName": "John Doe",  
        "totalPrice": 134.95,  
        "status": "Processing",  
        "shipping": {}
      }
      ```

2. **Get All Orders**
    - **HTTP Method:** GET
    - **Endpoint:** `/api/orders`
    - **Response:** Returns a list of all orders.
      ```json
      [
        {
          "orderId": 1,
          "orderItems": [
            {
              "productId": 1,
              "orderQuantity": 3
            },
            {
              "productId": 2,
              "orderQuantity": 2
            }
          ],
          "customerName": "John Doe",  
          "totalPrice": 134.95,  
          "status": "Processing",  
          "shipping": {}
        },
        {
          "orderId": 2,
          "orderItems": [
            {
              "productId": 1,
              "orderQuantity": 2
            },
            {
              "productId": 2,
              "orderQuantity": 1
            }
          ],
          "customerName": "Jane Smith",  
          "totalPrice": 50.95,  
          "status": "Shipped",  
          "shipping": {  
            "trackingCompany": "SendAirway",  
            "trackingNumber": "SE789012"  
          }
        },
        // Other orders...
      ]
      ```

3. **Get a Single Order**
    - **HTTP Method:** GET
    - **Endpoint:** `/api/orders/{orderId}`
   - **Response:** Returns information about a specific order, including order items.
     ```json
     {
       "orderId": 1,
       "orderItems": [
         {
           "productId": 1,
           "orderQuantity": 3
         },
         {
           "productId": 2,
           "orderQuantity": 2
         }
       ],
       "customerName": "John Doe",  
       "totalPrice": 134.95,  
       "status": "Processing",  
       "shipping": {}
     }
      ```

4. **Update an Order**
    - **HTTP Method:** PUT
    - **Endpoint:** `/api/orders/{orderId}`
    - **Request Body:** Provide the updated order data, including status and shipping information.
      ```json
      {
        "status": "Delivered",
        "shippingInfo": {
          "trackingCompany": "ShippingCo",
          "trackingNumber": "123456789"
        }
      }
      ```
   - **Response:** Returns the updated order.
     ```json
     {
       "orderId": 1,
       "orderItems": [
         {
           "productId": 1,
           "orderQuantity": 3
         },
         {
           "productId": 2,
           "orderQuantity": 2
         }
       ],
       "customerName": "John Doe",  
       "totalPrice": 134.95,  
       "status": "Delivered",
       "shippingInfo": {
         "trackingCompany": "ShippingCo",
         "trackingNumber": "123456789"
       }
     }
      ```
