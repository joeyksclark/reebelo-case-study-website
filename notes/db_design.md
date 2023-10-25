# DB Design

This data model assumes that each product is uniquely identified by its `productId`, and each order is uniquely identified by its `orderId`. The order_items table is used to establish a many-to-many relationship between products and orders. 

## Products Table:


```sql
CREATE TABLE products (
  productId SERIAL PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10, 2),
  stockQuantity INT
);
```

## Orders Table:

```sql
CREATE TABLE orders (
  orderId SERIAL PRIMARY KEY,
  customerName VARCHAR(255),
  totalPrice DECIMAL(10, 2),
  status VARCHAR(50),
  shippingTrackingCompany VARCHAR(255),
  shippingTrackingNumber VARCHAR(255)
);

CREATE TABLE order_items (
  orderId INT,
  productId INT,
  orderQuantity INT,
  FOREIGN KEY (orderId) REFERENCES orders(orderId),
  FOREIGN KEY (productId) REFERENCES products(productId)
);
```
