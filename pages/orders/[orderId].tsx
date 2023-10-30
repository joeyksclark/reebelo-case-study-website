import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Order, ShippingInfo } from '../../util/types';

const OrderDetailPage: React.FC = () => {
    const router = useRouter();
    const { orderId } = router.query;

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [updates, setUpdates] = useState<{ status?: string, shipping?: ShippingInfo }>({});
    const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!orderId || typeof orderId !== 'string') return;

            try {
                const response = await fetch(`/api/orders/${orderId}`);
                const data = await response.json();

                // Get product details for each order item
                const itemPromises = data.orderItems.map(async (item: any) => {
                    const prodResponse = await fetch(`/api/products/${item.productId}`);
                    item.product = await prodResponse.json();
                });

                await Promise.all(itemPromises);

                setOrder(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdates(prev => ({ ...prev, status: e.target.value }));
    };

    const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdates(prev => ({
            ...prev,
            shipping: {
                ...prev.shipping,
                [name]: value
            }
        }));
    };

    const handleUpdateOrder = async () => {
        if (!order || !orderId || (!updates.status && !updates.shipping)) {
            return;
        }

        const updatedOrder = {
            ...order,
            status: updates.status || order.status,
            shipping: updates.shipping || order.shipping,
        };

        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedOrder),
            });

            if (response.status === 200) {
                setOrder(updatedOrder);
                setUpdates({});
                setUpdateSuccess(true);
            } else {
                console.error('Failed to update the order');
                setUpdateSuccess(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setUpdateSuccess(false);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold">Order Details</h1>
            {loading ? <LoadingDisplay /> : <OrderDetailDisplay order={order!} updates={updates} handleStatusChange={handleStatusChange} handleShippingInfoChange={handleShippingInfoChange} handleUpdateOrder={handleUpdateOrder} updateSuccess={updateSuccess} />}
        </div>
    );
};

const LoadingDisplay: React.FC = () => (
    <p className="mt-5 text-lg">Loading...</p>
);

const OrderDetailDisplay: React.FC<any> = ({ order, updates, handleStatusChange, handleShippingInfoChange, handleUpdateOrder, updateSuccess }) => {
    return (
        <div className="mt-5 p-4 border rounded-md">
            <h2 className="text-2xl font-semibold">Order ID: {order.orderId}</h2>

            <h2 className="text-xl font-semibold underline">Personal Information</h2>
            <p className="text-lg">Customer Name: {order.customerName}</p>
            <p className="text-lg">Total Price: ${order.totalPrice.toFixed(2)}</p>
            <p className="text-lg">Status: {order.status}</p>

            <h2 className="text-xl font-semibold underline">Items</h2>
            <ul>
                {order.orderItems.map((item: any) => (
                    <li key={item.productId} className="mb-2">
                        <p className="text-lg font-semibold">{item.product?.name}</p>
                        <p className="text-md">Quantity: {item.orderQuantity}</p>
                        <p className="text-md">Price per Item: ${item.product?.price.toFixed(2)}</p>
                    </li>
                ))}
            </ul>

            <div className="mt-5">
                <h2 className="text-xl font-semibold underline">Shipping Information</h2>
                <p className="text-lg">Carrier: {order.shipping?.trackingCompany || 'Not available'}</p>
                <p className="text-lg">Tracking Number: {order.shipping?.trackingNumber || 'Not available'}</p>
                {updates.shipping ? (
                    <div className="mt-3">
                        <h3 className="text-lg font-semibold">Edit Shipping Information:</h3>
                        <div>
                            <label htmlFor="trackingCompany">Carrier:</label>
                            <input
                                type="text"
                                id="trackingCompany"
                                name="trackingCompany"
                                value={updates.shipping.trackingCompany || ''}
                                onChange={handleShippingInfoChange}
                                className="mr-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="trackingNumber">Tracking Number:</label>
                            <input
                                type="text"
                                id="trackingNumber"
                                name="trackingNumber"
                                value={updates.shipping.trackingNumber || ''}
                                onChange={handleShippingInfoChange}
                                className="mr-2"
                            />
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => handleShippingInfoChange({ target: { name: 'shipping', value: order.shipping } })}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-3"
                    >
                        Edit Shipping Info
                    </button>
                )}
            </div>

            <div className="mt-5">
                <h2 className="text-xl font-semibold underline">Order Status</h2>
                {updates.status ? (
                    <div className="mt-3">
                        <h3 className="text-lg font-semibold">Edit Order Status:</h3>
                        <div>
                            <label htmlFor="status">Status:</label>
                            <input
                                type="text"
                                id="status"
                                name="status"
                                value={updates.status}
                                onChange={handleStatusChange}
                                className="mr-2"
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="text-lg">Status: {order.status}</p>
                        <button
                            onClick={() => handleStatusChange({ target: { name: 'status', value: order.status } })}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-3"
                        >
                            Edit Status
                        </button>
                    </div>
                )}

                <hr className="border-t-2 border-gray-300 my-5"/>

                <button
                    onClick={handleUpdateOrder}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                >
                    Save Changes
                </button>

                {updateSuccess !== null && (
                    <div className={`mt-3 text-lg ${updateSuccess ? 'text-green-600' : 'text-red-600'}`}>
                        {updateSuccess ? 'Update successful' : 'Update failed'}
                    </div>
                )}
            </div>
        </div>
    );
};


export default OrderDetailPage;
