import { NextApiRequest, NextApiResponse } from 'next';

// TODO Mocked product data (replace with actual database or data source)
let products = [
  { id: 1, name: 'Product 1', price: 10.99, stockQuantity: 100 },
  { id: 2, name: 'Product 2', price: 19.99, stockQuantity: 50 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch all products
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    // Create or update a product
    const { id, name, price, stockQuantity } = req.body;

    // Check if the product already exists by ID
    const existingProduct = products.find((product) => product.id === id);

    if (existingProduct) {
      // Update the existing product
      existingProduct.name = name;
      existingProduct.price = price;
      existingProduct.stockQuantity = stockQuantity;
    } else {
      // Create a new product
      const newProduct = {
        id: products.length + 1, // TODO replace with database logic
        name,
        price,
        stockQuantity,
      };
      products.push(newProduct);
    }

    // Respond with the updated list of products
    res.status(200).json(products);
  } else {
    // Method Not Allowed
    res.status(405).end();
  }
}
