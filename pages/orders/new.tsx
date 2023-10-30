import React, { useState, useEffect } from 'react';
import { Product } from '../../util/types';

const NewOrderPage: React.FC = () => {
    const [customerName, setCustomerName] = useState<string>('');
    const [selectedProducts, setSelectedProducts] = useState<{ product: Product; quantity: number }[]>(
        []
    );
    const [products, setProducts] = useState<Product[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    const handleProductSelect = (productId: number) => {
        const selectedProduct = products.find((product) => product.productId === productId);
        if (selectedProduct) {
            const existingIndex = selectedProducts.findIndex((item) => item.product.productId === productId);
            if (existingIndex !== -1) {
                const updatedProducts = [...selectedProducts];
                updatedProducts[existingIndex].quantity += 1;
                setSelectedProducts(updatedProducts);
            } else {
                setSelectedProducts([...selectedProducts, { product: selectedProduct, quantity: 1 }]);
            }
        }
    };

    const handleOrderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newOrder = {
            customerName,
            orderItems: selectedProducts.map((item) => ({
                productId: item.product.productId,
                orderQuantity: item.quantity,
            })),
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOrder),
            });

            if (response.status === 201) {
                setSuccessMessage('Order created successfully');
                setCustomerName('');
                setSelectedProducts([]);
                setErrorMessage(null);
            } else {
                setErrorMessage('Failed to create the order');
                setSuccessMessage(null);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Failed to create the order');
            setSuccessMessage(null);
        }
    };

    const totalPrice = selectedProducts.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-4">Place an Order</h1>

            <form
                onSubmit={handleOrderSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label htmlFor="customerName" className="block text-lg font-semibold mb-2">
                        Customer Name:
                    </label>
                    <input
                        type="text"
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <h2 className="block text-lg font-semibold mb-2">Select Products:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {products.map((product) => (
                            <div key={product.productId} className="border rounded p-4">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p>Price: ${product.price.toFixed(2)}</p>
                                <p>Stock: {product.stockQuantity}</p>
                                <div className="flex items-center mt-4">
                                    <button
                                        type="button"
                                        onClick={() => handleProductSelect(product.productId)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedProducts.length > 0 && (
                    <div className="mb-4">
                        <h2 className="block text-lg font-semibold mb-2">Selected Products:</h2>
                        <ul>
                            {selectedProducts.map((item) => (
                                <li key={item.product.productId} className="mb-2">
                                    {item.product.name} - Price: ${item.product.price.toFixed(2)}, Quantity:
                                    <input
                                        value={item.quantity}
                                        onChange={(e) => {
                                            const updatedProducts = [...selectedProducts];
                                            updatedProducts.find((p) => p.product.productId === item.product.productId)!.quantity = parseInt(e.target.value);
                                            setSelectedProducts(updatedProducts);
                                        }}
                                        className="w-12 ml-2"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mb-4">
                    <h2 className="block text-lg font-semibold mb-2">Total Price:</h2>
                    <p>${totalPrice.toFixed(2)}</p>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    >
                        Create Order
                    </button>
                </div>
            </form>

            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default NewOrderPage;
