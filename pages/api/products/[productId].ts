import { getProduct, updateProduct } from "../../../util/productUtils";
import { ApiResponse, Product } from "../../../util/types";

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<Product>>) {
    try {
        if (req.method === 'GET') {
            // Get product by id
            const productId = parseInt(req.query.productId as string, 10);
            const product = await getProduct(productId);
            res.status(200).json(product);
        } else if (req.method == 'PUT') {
            // Update product by id
            const productId = parseInt(req.query.productId as string, 10);
            const { name, price, stockQuantity } = req.body;
            const product = await updateProduct(productId, name, price, stockQuantity);
            res.status(200).json(product);
        } else {
            // Method Not Allowed
            res.status(405).end();
        }
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}
