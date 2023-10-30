import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Order } from "../../util/types";

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders');
                if (!response.ok) {
                    throw new Error('Failed to fetch orders.');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold">Orders</h1>

            {error ? (
                <div className="mt-5 text-red-500">Error fetching orders: {error}</div>
            ) : (
                <ul className="mt-5">
                    {orders.map((order) => (
                        <OrderItem key={order.orderId} order={order} />
                    ))}
                </ul>
            )}
        </div>
    );
};

const OrderItem: React.FC<{ order: Order }> = ({ order }) => {
    return (
        <li key={order.orderId} className="mb-5 p-4 border rounded-md hover:bg-gray-100 transition duration-300">
            <Link href={`/orders/${order.orderId}`} className="block">
                <h2 className="text-xl font-semibold">Order ID: {order.orderId}</h2>
                <p className="text-lg">Customer Name: {order.customerName}</p>
                <p className="text-lg">Total Price: ${order.totalPrice.toFixed(2)}</p>
                <p className="text-lg">Status: {order.status}</p>
            </Link>
        </li>
    );
};

export default OrdersPage;
