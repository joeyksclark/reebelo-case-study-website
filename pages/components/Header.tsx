import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-500 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" passHref className="text-white text-3xl font-semibold font-poppins hover:text-gray-300">
                    Reebelo Case Study
                </Link>

                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link href="/products" passHref className="text-white hover:text-gray-300 font-medium text-lg cursor-pointer">
                                View Products
                            </Link>
                        </li>
                        <li>
                            <Link href="/orders" passHref className="text-white hover:text-gray-300 font-medium text-lg cursor-pointer">
                                View Orders
                            </Link>
                        </li>
                        <li>
                            <Link href="/products/new" passHref className="text-white hover:text-gray-300 font-medium text-lg cursor-pointer">
                                Add Product
                            </Link>
                        </li>
                        <li>
                            <Link href="/orders/new" passHref className="text-white hover:text-gray-300 font-medium text-lg cursor-pointer">
                                Place Order
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
