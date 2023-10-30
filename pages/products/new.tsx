import React, { useState } from 'react';

type ProductFormState = {
    name: string;
    price: number;
    stockQuantity: number;
};

const NewProductPage: React.FC = () => {
    const [product, setProduct] = useState<ProductFormState>({ name: '', price: 0, stockQuantity: 0 });
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setProduct(prev => ({ ...prev, [id]: id === 'name' ? value : Number(value) }));
    };

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!product.name || product.price <= 0 || product.stockQuantity <= 0) {
            setStatusMessage('Please provide valid product details.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.status === 201) {
                setStatusMessage('Product created successfully');
                setProduct({ name: '', price: 0, stockQuantity: 0 });
            } else {
                setStatusMessage('Failed to create the product');
            }
        } catch (error) {
            setStatusMessage('An error occurred while creating the product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold">Sell a New Product</h1>

            {statusMessage && (
                <div className={`mt-5 p-3 rounded ${statusMessage.startsWith('Failed') ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                    {statusMessage}
                </div>
            )}

            <form onSubmit={handleProductSubmit} className="mt-5">
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium">Product Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={product.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block font-medium">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={product.price}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="stockQuantity" className="block font-medium">Stock Quantity:</label>
                    <input
                        type="number"
                        id="stockQuantity"
                        value={product.stockQuantity}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md" disabled={isLoading}>
                        {isLoading ? 'Creating...' : 'Create Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewProductPage;
