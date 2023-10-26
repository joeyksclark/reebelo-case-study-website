import { findProductById } from "../../../util/productUtils";
import { ApiResponse, Product } from "../../../util/types";

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<Product>>) {
    try {
        if (req.method === 'GET') {
            getProduct(req, res);
        } else if (req.method == 'PUT') {
            updateProduct(req, res);
        } else {
            // Method Not Allowed
            res.status(405).end();
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

const getProduct = (req: NextApiRequest, res: NextApiResponse<ApiResponse<Product>>) => {
    try {
        const productId = parseInt(req.query.productId as string, 10);
        const existingProduct = findProductById(productId);

        if (existingProduct) {
            res.status(200).json(existingProduct);
        } else {
            res.status(404).end();
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateProduct = (req: NextApiRequest, res: NextApiResponse<ApiResponse<Product>>) => {
    try {
        const { name, price, stockQuantity } = req.body;

        const productId = parseInt(req.query.productId as string, 10);
        const existingProduct = findProductById(productId);

        if (existingProduct) {
            existingProduct.name = name;
            existingProduct.price = price;
            existingProduct.stockQuantity = stockQuantity;

            res.status(200).json(existingProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
