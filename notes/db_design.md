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

## Placeholder Data:
```sql
INSERT INTO products (name, price, stockQuantity)
VALUES
    ('Product 1', 10.99, 100),
    ('Product 2', 19.99, 50);
```

```sql
INSERT INTO orders (customerName, totalPrice, status, shippingTrackingCompany, shippingTrackingNumber)
VALUES
    ('Joey', 61.96, 'Processing', NULL, NULL),
    ('Nina', 39.98, 'Shipped', 'SendAirway', 'SE789012'),
    ('Marika', 72.95, 'Delivered', 'ShipExpress', 'SE789012'),
    ('Caitlin', 10.95, 'Canceled', 'iShipFast', '5819057849302');
```

```sql
INSERT INTO order_items (orderId, productId, orderQuantity)
VALUES
    (1, 1, 2),
    (1, 2, 1),
    (2, 1, 2),
    (2, 2, 1),
    (3, 1, 3),
    (3, 2, 2),
    (4, 1, 1);
```
