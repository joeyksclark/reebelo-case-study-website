import { Product } from "./types";
import db from "./db";

export const getAllProducts = (): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM products';
        db.all(query, (error, rows) => {
            if (error) {
                reject(error);
            } else {
                resolve(rows as Product[]);
            }
        });
    });
};

export const findProductById = (productId: number): Promise<Product | undefined> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM products WHERE productId = ?';
        db.get(query, productId, (error, row) => {
            if (error) {
                reject(error);
            } else {
                resolve(row as Product);
            }
        });
    });
};

export const getProduct = async (productId: number): Promise<Product> => {
    const product = await findProductById(productId)

    if (product) {
        return product;
    } else {
        throw new Error(`Product with ID ${productId} doesn't exist.`)
    }
};

export const createProduct = (name: string, price: number, stockQuantity: number): Promise<Product> => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO products (name, price, stockQuantity) VALUES (?, ?, ?)';
        db.run(
            query,
            [name, price, stockQuantity],
            function (error) {
                if (error) {
                    reject(new Error(`Product creation failed: ${error.message}`));
                } else {
                    const lastId = this.lastID;
                    if (lastId) {
                        resolve({
                            productId: lastId,
                            name,
                            price,
                            stockQuantity,
                        });
                    } else {
                        reject(new Error('Product creation failed: null lastId.'));
                    }
                }
            }
        );
    });
};

export const updateProduct = (productId: number, name: string, price: number, stockQuantity: number): Promise<Product> => {
    return new Promise(async (resolve, reject) => {
        // Check if product exists
        await getProduct(productId);

        const query = 'UPDATE products SET name = ?, price = ?, stockQuantity = ? WHERE productId = ?';
        db.run(
            query,
            [name, price, stockQuantity, productId],
            (error) => {
                if (error) {
                    reject(new Error(`Error updating product: ${error.message}`));
                } else {
                    resolve({
                        productId: productId,
                        name,
                        price,
                        stockQuantity,
                    });
                }
            }
        );
    });
};
