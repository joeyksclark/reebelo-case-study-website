import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Order, ShippingInfo } from "../../util/types";

const OrderDetailPage: React.FC = () => {
    const router = useRouter();
    const { orderId } = router.query;

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (orderId && typeof orderId === 'string') {
            fetch(`/api/orders/${orderId}`)
                .then((response) => response.json())
                .then(async (data) => {
                    // Get product details for each order item
                    const updatedOrder = { ...data };
                    const itemPromises = updatedOrder.orderItems.map(async (item: any) => {
                        const response = await fetch(`/api/products/${item.productId}`);
                        item.product = await response.json();
                    });

                    await Promise.all(itemPromises);

                    setOrder(updatedOrder);
                    setLoading(false);
                });
        }
    }, [orderId]);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold">Order Details</h1>
            {loading ? (
                <p className="mt-5 text-lg">Loading...</p>
            ) : (
                <div className="mt-5 p-4 border rounded-md">
                    <h2 className="text-2xl font-semibold">Order ID: {order?.orderId}</h2>

                    <br />

                    <h2 className="text-xl font-semibold underline">Personal Information</h2>
                    <p className="text-lg">Customer Name: {order?.customerName}</p>
                    <p className="text-lg">Total Price: ${order?.totalPrice.toFixed(2)}</p>
                    <p className="text-lg">Status: {order?.status}</p>

                    <div className="mt-5">
                        <h2 className="text-xl font-semibold underline">Items</h2>
                        <ul>
                            {order?.orderItems.map((item: any) => (
                                <li key={item.productId} className="mb-2">
                                    <p className="text-lg font-semibold">{item.product?.name}</p>
                                    <p className="text-md">Quantity: {item.orderQuantity}</p>
                                    <p className="text-md">Price per Item: ${item.product?.price.toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <br />

                    {order?.shipping ? (
                        <div className="mt-5">
                            <h2 className="text-xl font-semibold underline">Shipping Information</h2>
                            <p className="text-lg">Carrier: {order?.shipping?.trackingCompany || 'Not available'}</p>
                            <p className="text-lg">Tracking Number: {order?.shipping?.trackingNumber || 'Not available'}</p>
                        </div>
                    ) : (
                        <p className="mt-5 text-lg">Your item has not been shipped.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderDetailPage;
