import { Product } from "../../util/types";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    return (
        <main className="container mx-auto py-10" aria-label="Products">
            <header>
                <h1 className="text-4xl font-bold mb-5">Products</h1>
            </header>

            <section>
                <ul>
                    {products.map((product) => (
                        <li key={product.productId} className="border p-4 my-2 hover:bg-gray-100 transition duration-300">
                            <Link href={`/products/${product.productId}`} className="block cursor-pointer product-link">
                                <h2 className="text-xl font-semibold">
                                    {product.name}
                                </h2>
                                <p className="text-lg">Price: ${product.price.toFixed(2)}</p>
                                <p className="text-lg">Stock Quantity: {product.stockQuantity}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default ProductsPage;
