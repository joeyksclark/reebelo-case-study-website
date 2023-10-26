import React, { useState } from 'react';

const NewProductPage: React.FC = () => {
    const [productName, setProductName] = useState<string>('');
    const [productPrice, setProductPrice] = useState<number>(0);
    const [productStockQuantity, setProductStockQuantity] = useState<number>(0);

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
                // Product created successfully
                alert('Product created successfully');
                // Reset the form fields
                setProductName('');
                setProductPrice(0);
                setProductStockQuantity(0);
            } else {
                // Handle errors, e.g., display an error message
                alert('Failed to create the product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Add a New Product</h1>

            <form onSubmit={handleProductSubmit}>
                <div>
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="productPrice">Price:</label>
                    <input
                        type="number"
                        id="productPrice"
                        value={productPrice}
                        onChange={(e) => setProductPrice(Number(e.target.value))}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="productStockQuantity">Stock Quantity:</label>
                    <input
                        type="number"
                        id="productStockQuantity"
                        value={productStockQuantity}
                        onChange={(e) => setProductStockQuantity(Number(e.target.value))}
                        required
                    />
                </div>

                <div>
                    <button type="submit">Create Product</button>
                </div>
            </form>
        </div>
    );
};

export default NewProductPage;
