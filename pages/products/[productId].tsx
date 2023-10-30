import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Product } from '../../util/types';

const ProductDetailPage: React.FC = () => {
    const router = useRouter();
    const { productId } = router.query;

    const [product, setProduct] = useState<Product | null>(null);
    const [editing, setEditing] = useState(false);
    const [updatedPrice, setUpdatedPrice] = useState<number | undefined>(undefined);
    const [updatedStockQuantity, setUpdatedStockQuantity] = useState<number | undefined>(undefined);
    const [updateStatus, setUpdateStatus] = useState<string | null>(null);

    useEffect(() => {
        if (productId && typeof productId === 'string') {
            fetch(`/api/products/${productId}`)
                .then((response) => response.json())
                .then((data) => {
                    setProduct(data);
                    setUpdatedPrice(data.price);
                    setUpdatedStockQuantity(data.stockQuantity);
                });
        }
    }, [productId]);

    const handleUpdateProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        if (productId && typeof productId === 'string' && updatedPrice !== undefined && updatedStockQuantity !== undefined) {
            try {
                const response = await fetch(`/api/products/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        price: updatedPrice,
                        stockQuantity: updatedStockQuantity,
                    }),
                });

                if (response.status === 200) {
                    setEditing(false);
                    setUpdateStatus('Update successful');
                    fetch(`/api/products/${productId}`)
                        .then((response) => response.json())
                        .then((data) => {
                            setProduct(data);
                        });
                } else {
                    console.error('Failed to update the product');
                    setUpdateStatus('Update failed');
                }
            } catch (error) {
                console.error('Error:', error);
                setUpdateStatus('Update failed');
            }
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold">Product Details</h1>
            {product ? (
                <div className="mt-5">
                    <h2 className="text-2xl font-semibold">{product.name}</h2>
                    {editing ? (
                        <form onSubmit={handleUpdateProduct}>
                            <div className="mb-4">
                                <label htmlFor="updatedPrice" className="block text-gray-700 text-sm font-bold mb-2">
                                    Updated Price:
                                </label>
                                <input
                                    type="number"
                                    id="updatedPrice"
                                    value={updatedPrice !== undefined ? updatedPrice : product.price}
                                    onChange={(e) => setUpdatedPrice(Number(e.target.value))}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="updatedStockQuantity" className="block text-gray-700 text-sm font-bold mb-2">
                                    Updated Stock Quantity:
                                </label>
                                <input
                                    type="number"
                                    id="updatedStockQuantity"
                                    value={updatedStockQuantity !== undefined ? updatedStockQuantity : product.stockQuantity}
                                    onChange={(e) => setUpdatedStockQuantity(Number(e.target.value))}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                            >
                                Save
                            </button>
                        </form>
                    ) : (
                        <>
                            <p className="text-lg">Price: ${product.price.toFixed(2)}</p>
                            <p className="text-lg">Stock Quantity: {product.stockQuantity}</p>
                            <button
                                onClick={() => setEditing(true)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-2"
                            >
                                Edit
                            </button>
                            {updateStatus && (
                                <div
                                    className={`${
                                        updateStatus === 'Update successful' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                                    } p-2 rounded-md mb-4 my-2`}
                                >
                                    {updateStatus}
                                </div>
                            )}
                        </>
                    )}
                </div>
            ) : (
                <p className="mt-5 text-lg">Loading...</p>
            )}
        </div>
    );
};

export default ProductDetailPage;
