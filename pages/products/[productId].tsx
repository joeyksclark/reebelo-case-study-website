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
        <div>
            <h1>Product Details</h1>
            {product ? (
                <div>
                    <h2>{product.name}</h2>
                    <p>Price: ${product.price.toFixed(2)}</p>
                    <p>Stock Quantity: {product.stockQuantity}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductDetailPage;
