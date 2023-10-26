import {Product} from "../../util/types";

import React, { useEffect, useState } from 'react';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    return (
        <div>
            <h1>Products</h1>

            <ul>
                {products.map((product) => (
                    <li key={product.productId}>
                        <h2>{product.name}</h2>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <p>Stock Quantity: {product.stockQuantity}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsPage;
