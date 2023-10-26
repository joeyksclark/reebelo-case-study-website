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
        <div>
            <h1>Welcome to the Reebelo Dashboard</h1>

            <div>
                <h2>Product Statistics</h2>
                <p>Total Products: {productCount}</p>
            </div>

            <div>
                <h2>Order Statistics</h2>
                <p>Total Orders: {orderCount}</p>
            </div>

            <div>
                <Link href="/products">View Products</Link>
            </div>

            <div>
                <Link href="/orders">View Orders</Link>
            </div>
        </div>
    );
};

export default HomePage;
