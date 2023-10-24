import { NextApiRequest, NextApiResponse } from 'next';

// TODO Mocked product data (replace with actual database or data source)
let products = [
  { id: 1, name: 'Product 1', price: 10.99, quantity: 100 },
  { id: 2, name: 'Product 2', price: 19.99, quantity: 50 },
];

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
      const existingProduct = getAllProducts().find((product) => product.id === id);

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

const getAllProducts = () => {
  return products;
}

const validateInput = (name: string, price: number, quantity: number) => {
  if (!name || !price || !quantity) {
    throw new Error('Invalid input data');
  }
}

const createProduct = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Extract the product data from the request body
    const { name, price, quantity } = req.body;

    const newProduct = {
      id: products.length + 1,
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

    // Respond with the updated product
    res.status(200).json(getAllProducts());
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
