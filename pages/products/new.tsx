import React, { useState } from 'react';

const NewProductPage: React.FC = () => {
    const [productName, setProductName] = useState<string>('');
    const [productPrice, setProductPrice] = useState<number>(0);
    const [productStockQuantity, setProductStockQuantity] = useState<number>(0);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newProduct = {
            name: productName,
            price: productPrice,
            stockQuantity: productStockQuantity,
        };

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (response.status === 201) {
                setSuccessMessage('Product created successfully');
                setProductName('');
                setProductPrice(0);
                setProductStockQuantity(0);
                setErrorMessage(null);
            } else {
                setErrorMessage('Failed to create the product');
                setSuccessMessage(null);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while creating the product');
            setSuccessMessage(null);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold">Sell a New Product</h1>

            {successMessage && (
                <div className="mt-5 bg-green-200 text-green-800 p-3 rounded">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="mt-5 bg-red-200 text-red-800 p-3 rounded">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleProductSubmit} className="mt-5">
                <div className="mb-4">
                    <label htmlFor="productName" className="block font-medium">Product Name:</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="productPrice" className="block font-medium">Price:</label>
                    <input
                        type="number"
                        id="productPrice"
                        value={productPrice}
                        onChange={(e) => setProductPrice(Number(e.target.value))}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="productStockQuantity" className="block font-medium">Stock Quantity:</label>
                    <input
                        type="number"
                        id="productStockQuantity"
                        value={productStockQuantity}
                        onChange={(e) => setProductStockQuantity(Number(e.target.value))}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewProductPage;
