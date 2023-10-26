import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../util/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        db.serialize(() => {
            dropTables();
            createTables();
            insertDummyData();
        });

        res.status(200).json({ message: 'Database reset successful' });
    } catch (error: any) {
        res.status(500).json({ error: 'Database reset failed', details: error.message });
    }
}

const dropTables = () => {
    const dropProductsTable = 'DROP TABLE IF EXISTS products;';
    const dropOrdersTable = 'DROP TABLE IF EXISTS orders;';
    const dropOrderItemsTable = 'DROP TABLE IF EXISTS order_items;';

    db.run(dropProductsTable);
    db.run(dropOrdersTable);
    db.run(dropOrderItemsTable);
}

const createTables = () => {
    // Define SQL statements to create tables
    const createProductsTable = `
        CREATE TABLE IF NOT EXISTS products (
            productId INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            price REAL,
            stockQuantity INTEGER
        );
    `;

    const createOrdersTable = `
        CREATE TABLE IF NOT EXISTS orders (
            orderId INTEGER PRIMARY KEY AUTOINCREMENT,
            customerName TEXT,
            totalPrice REAL,
            status TEXT,
            shippingTrackingCompany TEXT,
            shippingTrackingNumber TEXT
        );
    `;

    const createOrderItemsTable = `
        CREATE TABLE IF NOT EXISTS order_items (
            orderId INTEGER,
            productId INTEGER,
            orderQuantity INTEGER,
            FOREIGN KEY (orderId) REFERENCES orders(orderId),
            FOREIGN KEY (productId) REFERENCES products(productId)
        );
    `;

    // Execute SQL statements to create tables
    db.run(createProductsTable, (err) => {
        if (err) {
            console.error('Error creating products table:', err.message);
        } else {
            console.log('Products table created successfully.');
        }
    });
    db.run(createOrdersTable, (err) => {
        if (err) {
            console.error('Error creating orders table:', err.message);
        } else {
            console.log('Orders table created successfully.');
        }
    });
    db.run(createOrderItemsTable, (err) => {
        if (err) {
            console.error('Error creating order_items table:', err.message);
        } else {
            console.log('order_items table created successfully.');
        }
    });
}

const insertDummyData = () => {
    // Insert Products
    db.run('INSERT INTO products (name, price, stockQuantity) VALUES (?, ?, ?);', [
        'Product 1',
        10.99,
        100,
    ]);

    db.run('INSERT INTO products (name, price, stockQuantity) VALUES (?, ?, ?);', [
        'Product 2',
        19.99,
        50,
    ]);

    // Insert Orders
    db.run('INSERT INTO orders (customerName, totalPrice, status, shippingTrackingCompany, shippingTrackingNumber) VALUES (?, ?, ?, ?, ?);', [
        'Joey',
        61.96,
        'Processing',
        null,
        null,
    ]);

    db.run('INSERT INTO orders (customerName, totalPrice, status, shippingTrackingCompany, shippingTrackingNumber) VALUES (?, ?, ?, ?, ?);', [
        'Nina',
        39.98,
        'Shipped',
        'SendAirway',
        'SE789012',
    ]);

    db.run('INSERT INTO orders (customerName, totalPrice, status, shippingTrackingCompany, shippingTrackingNumber) VALUES (?, ?, ?, ?, ?);', [
        'Marika',
        72.95,
        'Delivered',
        'ShipExpress',
        'SE789012',
    ]);

    db.run('INSERT INTO orders (customerName, totalPrice, status, shippingTrackingCompany, shippingTrackingNumber) VALUES (?, ?, ?, ?, ?);', [
        'Caitlin',
        10.95,
        'Canceled',
        'iShipFast',
        '5819057849302',
    ]);

    // Insert Order Items
    db.run('INSERT INTO order_items (orderId, productId, orderQuantity) VALUES (?, ?, ?);', [
        1,
        1,
        2,
    ]);

    db.run('INSERT INTO order_items (orderId, productId, orderQuantity) VALUES (?, ?, ?);', [
        1,
        2,
        1,
    ]);

    db.run('INSERT INTO order_items (orderId, productId, orderQuantity) VALUES (?, ?, ?);', [
        2,
        1,
        2,
    ]);

    db.run('INSERT INTO order_items (orderId, productId, orderQuantity) VALUES (?, ?, ?);', [
        2,
        2,
        1,
    ]);

    db.run('INSERT INTO order_items (orderId, productId, orderQuantity) VALUES (?, ?, ?);', [
        3,
        1,
        3,
    ]);

    db.run('INSERT INTO order_items (orderId, productId, orderQuantity) VALUES (?, ?, ?);', [
        3,
        2,
        2,
    ]);

    db.run('INSERT INTO order_items (orderId, productId, orderQuantity) VALUES (?, ?, ?);', [
        4,
        1,
        1,
    ]);
}
