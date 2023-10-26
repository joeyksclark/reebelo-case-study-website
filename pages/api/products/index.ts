import { getAllProducts, createProduct } from '../../../util/productUtils';
import { ApiResponse, Product } from "../../../util/types";

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<Product>>) {
  try {
    if (req.method === 'GET') {
      // Get all products
      const products = await getAllProducts();
      res.status(200).json(products);
    } else if (req.method === 'POST') {
      // Create a product
      const { name, price, stockQuantity } = req.body;
      const newProduct = await createProduct(name, price, stockQuantity);
      res.status(201).json(newProduct);
    } else {
      // Method Not Allowed
      res.status(405).end();
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}