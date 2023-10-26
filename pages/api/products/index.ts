import { getAllProducts } from '../../../util/productUtils';
import { ApiResponse, Product } from "../../../util/types";

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<Product>>) {
  try {
    if (req.method === 'GET') {
      // Fetch all products
      res.status(200).json(getAllProducts());
    } else if (req.method === 'POST') {
      // Create a product
      createProduct(req, res);
    } else {
      // Method Not Allowed
      res.status(405).end();
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

const validateInput = (name: string, price: number, stockQuantity: number) => {
  if (!name || !price || !stockQuantity) {
    throw new Error('Invalid input data');
  }
}

const createProduct = (req: NextApiRequest, res: NextApiResponse<ApiResponse<Product>>) => {
  try {
    const { name, price, stockQuantity } = req.body;
    validateInput(name, price, stockQuantity);

    let products = getAllProducts();
    const newProduct: Product = {
      productId: products.length + 1,
      name,
      price,
      stockQuantity,
    };
    products.push(newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
