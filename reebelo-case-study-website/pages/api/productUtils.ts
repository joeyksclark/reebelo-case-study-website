// TODO Mocked product data (replace with actual database or data source)
let products = [
    { id: 1, name: 'Product 1', price: 10.99, quantity: 100 },
    { id: 2, name: 'Product 2', price: 19.99, quantity: 50 },
];

export const getAllProducts = () => {
    return products;
}

export const findProductById = (productId: number) => {
    return products.find((product) => product.id === productId);
};
