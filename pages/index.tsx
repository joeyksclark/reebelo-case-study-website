import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Header from "./components/Header";
import Footer from "./components/Footer";

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
            <Header />
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
            <Footer />
        </div>
    );
};

export default HomePage;
