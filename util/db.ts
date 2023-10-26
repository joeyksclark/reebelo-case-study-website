import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('../database.sqlite');

db.run(`
  CREATE TABLE IF NOT EXISTS products (
    productId INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    stockQuantity INTEGER
  )
`);

export default db;