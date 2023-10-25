import { getAllProducts } from '../productUtils';

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

const createProduct = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, price, stockQuantity } = req.body;
    validateInput(name, price, stockQuantity);

    let products = getAllProducts()
    const newProduct = {
      productId: getAllProducts.length + 1,
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
