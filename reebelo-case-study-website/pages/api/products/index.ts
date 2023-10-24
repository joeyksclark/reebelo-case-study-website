import { findProductById, getAllProducts } from '../productUtils';

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Fetch all products
      res.status(200).json(getAllProducts());

    } else if (req.method === 'POST') {
      // Create or update a product
      const { id, name, price, quantity } = req.body;

      validateInput(name, price, quantity);

      // Check if the product already exists by ID
      const existingProduct = findProductById(id);

      if (existingProduct) {
        updateProduct(req, res, existingProduct);
      } else {
        createProduct(req, res)
      }
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
    let products = getAllProducts()

    const newProduct = {
      id: getAllProducts.length + 1,
      name,
      price,
      quantity,
    };
    products.push(newProduct);

    res.status(201).json(getAllProducts());
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProduct = (req: NextApiRequest, res: NextApiResponse, existingProduct: any) => {
  try {
    const { name, price, quantity } = req.body;

    existingProduct.name = name;
    existingProduct.price = price;
    existingProduct.quantity = quantity;

    res.status(200).json(getAllProducts());
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
