import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {Order} from "../../util/types";
import Header from "../components/Header";
import Footer from "../components/Footer";

const OrderDetailPage: React.FC = () => {
    const router = useRouter();
    const { orderId } = router.query;

    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (orderId && typeof orderId === 'string') {
            fetch(`/api/orders/${orderId}`)
                .then((response) => response.json())
                .then((data) => {
                    setOrder(data);
                });
        }
    }, [orderId]);

    return (
        <div>
            <Header />
            <h1>Order Details</h1>
            {order ? (
                <div>
                    <h2>Order ID: {order.orderId}</h2>
                    <p>Customer Name: {order.customerName}</p>
                    <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                    <p>Status: {order.status}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <Footer />
        </div>
    );
};

export default OrderDetailPage;
