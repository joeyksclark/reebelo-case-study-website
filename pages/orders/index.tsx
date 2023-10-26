import React, { useEffect, useState } from 'react';
import {Order} from "../../util/types";
import Header from "../components/Header";
import Footer from "../components/Footer";

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetch('/api/orders')
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
            });
    }, []);

    return (
        <div>
            <Header />
            <h1>Orders</h1>

            <ul>
                {orders.map((order) => (
                    <li key={order.orderId}>
                        <h2>Order ID: {order.orderId}</h2>
                        <p>Customer Name: {order.customerName}</p>
                        <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                        <p>Status: {order.status}</p>
                    </li>
                ))}
            </ul>
            <Footer />
        </div>
    );
};

export default OrdersPage;
