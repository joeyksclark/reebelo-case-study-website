import {findProductById, getAllProducts} from '../productUtils';

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

const validateInput = (name: string, price: number, quantity: number) => {
  if (!name || !price || !quantity) {
    throw new Error('Invalid input data');
  }
}

const createProduct = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, price, quantity } = req.body;
    validateInput(name, price, quantity);

    let products = getAllProducts()
    const newProduct = {
      id: getAllProducts.length + 1,
      name,
      price,
      quantity,
    };
    products.push(newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
