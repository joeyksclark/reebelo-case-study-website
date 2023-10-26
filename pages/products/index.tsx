import { Product } from "../../util/types";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

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
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold">Products</h1>

            <ul className="mt-5">
                {products.map((product) => (
                    <Link key={product.productId} href={`/products/${product.productId}`}>
                        <li className="cursor-pointer border p-4 my-2">
                            <p className="text-xl font-semibold">
                                {product.name}
                            </p>
                            <p className="text-lg">Price: ${product.price.toFixed(2)}</p>
                            <p className="text-lg">Stock Quantity: {product.stockQuantity}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default ProductsPage;
