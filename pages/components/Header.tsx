import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-500 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-2xl font-bold">
                    Reebelo
                </Link>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link href="/products" className="text-white hover:text-gray-300">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link href="/orders" className="text-white hover:text-gray-300">
                                Orders
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
