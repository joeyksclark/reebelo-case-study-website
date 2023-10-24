// TODO Mocked product data (replace with actual database or data source)
let products = [
    { productId: 1, name: 'Product 1', price: 10.99, stockQuantity: 100 },
    { productId: 2, name: 'Product 2', price: 19.99, stockQuantity: 50 },
];

export const getAllProducts = () => {
    return products;
}

export const findProductById = (productId: number) => {
    return products.find((product) => product.productId === productId);
};
