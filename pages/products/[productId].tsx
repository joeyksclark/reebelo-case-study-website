import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Product } from "../../util/types";

const ProductDetailPage: React.FC = () => {
    const router = useRouter();
    const { productId } = router.query;

    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (productId && typeof productId === 'string') {
            fetch(`/api/products/${productId}`)
                .then((response) => response.json())
                .then((data) => {
                    setProduct(data);
                });
        }
    }, [productId]);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold">Product Details</h1>
            {product ? (
                <div className="mt-5">
                    <h2 className="text-2xl font-semibold">{product.name}</h2>
                    <p className="text-lg">Price: ${product.price.toFixed(2)}</p>
                    <p className="text-lg">Stock Quantity: {product.stockQuantity}</p>
                </div>
            ) : (
                <p className="mt-5 text-lg">Loading...</p>
            )}
        </div>
    );
};

export default ProductDetailPage;
