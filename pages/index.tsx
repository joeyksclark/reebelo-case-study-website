import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
    const [productCount, setProductCount] = useState<number>(0);
    const [orderCount, setOrderCount] = useState<number>(0);

    useEffect(() => {
        fetch('/api/products')
            .then((response) => response.json())
            .then((data) => {
                setProductCount(data.length);
            });

        fetch('/api/orders')
            .then((response) => response.json())
            .then((data) => {
                setOrderCount(data.length);
            });
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Product Statistics</h2>
                <p className="text-gray-700">Total Products: {productCount}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Order Statistics</h2>
                <p className="text-gray-700">Total Orders: {orderCount}</p>
            </div>
        </div>
    );
};

export default HomePage;
