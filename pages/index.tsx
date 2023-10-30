import React, { useEffect, useState } from 'react';

const HomePage: React.FC = () => {
    const [productCount, setProductCount] = useState<number | null>(null);
    const [orderCount, setOrderCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [productResponse, orderResponse] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/orders')
                ]);

                const products = await productResponse.json();
                const orders = await orderResponse.json();

                setProductCount(products.length);
                setOrderCount(orders.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Product Statistics</h2>
                <p className="text-gray-700">Total Products: {productCount !== null ? productCount : 'Loading...'}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Order Statistics</h2>
                <p className="text-gray-700">Total Orders: {orderCount !== null ? orderCount : 'Loading...'}</p>
            </div>
        </div>
    );
};

export default HomePage;
