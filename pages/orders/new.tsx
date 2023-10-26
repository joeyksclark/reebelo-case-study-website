import React, { useState, useEffect } from 'react';
import {Product} from "../../util/types";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NewOrderPage: React.FC = () => {
    const [customerName, setCustomerName] = useState<string>('');
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

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
            setSelectedProducts([...selectedProducts, selectedProduct]);
        }
    };

    const handleOrderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newOrder = {
            customerName,
            orderItems: selectedProducts.map((product) => ({
                productId: product.productId,
                orderQuantity: 1,
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
                alert('Order created successfully');
                setCustomerName('');
                setSelectedProducts([]);
            } else {
                alert('Failed to create the order');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Header />
            <h1>Create a New Order</h1>

            <form onSubmit={handleOrderSubmit}>
                <div>
                    <label htmlFor="customerName">Customer Name:</label>
                    <input
                        type="text"
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <h2>Select Products:</h2>
                    <ul>
                        {products.map((product) => (
                            <li key={product.productId}>
                                {product.name} (
                                <button
                                    type="button"
                                    onClick={() => handleProductSelect(product.productId)}
                                >
                                    Add
                                </button>
                                )
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <button type="submit">Create Order</button>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default NewOrderPage;
