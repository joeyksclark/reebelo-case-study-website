import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Order } from "../../util/types";

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
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold">Orders</h1>

            <ul className="mt-5">
                {orders.map((order) => (
                    <li key={order.orderId} className="mb-5 p-4 border rounded-md hover:bg-gray-100 transition duration-300">
                        <Link href={`/orders/${order.orderId}`} className="block">
                            <h2 className="text-2xl font-semibold">Order ID: {order.orderId}</h2>
                            <p className="text-lg">Customer Name: {order.customerName}</p>
                            <p className="text-lg">Total Price: ${order.totalPrice.toFixed(2)}</p>
                            <p className="text-lg">Status: {order.status}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrdersPage;
