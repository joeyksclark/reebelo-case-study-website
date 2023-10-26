import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Order, ShippingInfo } from '../../util/types';

const OrderDetailPage: React.FC = () => {
    const router = useRouter();
    const { orderId } = router.query;

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [updatedStatus, setUpdatedStatus] = useState<string | undefined>(undefined);
    const [updatedShippingInfo, setUpdatedShippingInfo] = useState<ShippingInfo | undefined>(undefined);
    const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);

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

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedStatus(e.target.value);
    };

    const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedShippingInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleUpdateOrder = async () => {
        if (!order || !orderId || (!updatedStatus && !updatedShippingInfo)) {
            return;
        }

        const updatedOrder = {
            ...order,
            status: updatedStatus || order.status,
            shipping: updatedShippingInfo || order.shipping,
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
                setUpdatedStatus(undefined);
                setUpdatedShippingInfo(undefined);
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

                    <br />

                    <h2 className="text-xl font-semibold underline">Items</h2>
                    <ul>
                        {order?.orderItems.map((item: any) => (
                            <li key={item.productId} className="mb-2">
                                <p className="text-lg font-semibold">{item.product?.name}</p>
                                <p className="text-md">Quantity: {item.orderQuantity}</p>
                                <p className="text-md">Price per Item: ${item.product?.price.toFixed(2)}</p>
                            </li>    ))}
                    </ul>

                    <div className="mt-5">
                        <h2 className="text-xl font-semibold underline">Shipping Information</h2>
                        <div>
                            <p className="text-lg">
                                Carrier: {order?.shipping?.trackingCompany || 'Not available'}
                            </p>
                            <p className="text-lg">
                                Tracking Number: {order?.shipping?.trackingNumber || 'Not available'}
                            </p>
                            {updatedShippingInfo ? (
                                <div className="mt-3">
                                    <h3 className="text-lg font-semibold">Edit Shipping Information:</h3>
                                    <div>
                                        <label htmlFor="trackingCompany">Carrier:</label>
                                        <input
                                            type="text"
                                            id="trackingCompany"
                                            name="trackingCompany"
                                            value={updatedShippingInfo?.trackingCompany || ''}
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
                                            value={updatedShippingInfo?.trackingNumber || ''}
                                            onChange={handleShippingInfoChange}
                                            className="mr-2"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        setUpdatedShippingInfo(order?.shipping || {});
                                    }}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-3"
                                >
                                    Edit Shipping Info
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mt-5">
                        <h2 className="text-xl font-semibold underline">Order Status</h2>
                        {updatedStatus ? (
                            <div className="mt-3">
                                <h3 className="text-lg font-semibold">Edit Order Status:</h3>
                                <div>
                                    <label htmlFor="status">Status:</label>
                                    <input
                                        type="text"
                                        id="status"
                                        name="status"
                                        value={updatedStatus}
                                        onChange={handleStatusChange}
                                        className="mr-2"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p className="text-lg">Status: {order?.status}</p>
                                <button
                                    onClick={() => {
                                        setUpdatedStatus(order?.status || '');
                                    }}
                                    className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-3"
                                >
                                    Edit Status
                                </button>
                            </div>
                        )}

                        <button
                            onClick={handleUpdateOrder}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-3"
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
            )}
        </div>
    );
};

export default OrderDetailPage;
