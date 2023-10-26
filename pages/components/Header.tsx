import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-500 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-3xl font-semibold font-poppins hover:text-gray-300">
                    <Link href="/" passHref>
                        Reebelo Case Study
                    </Link>
                </div>

                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <div className="text-white hover:text-gray-300 font-medium text-lg cursor-pointer">
                                <Link href="/products" passHref>
                                    View Products
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="text-white hover:text-gray-300 font-medium text-lg cursor-pointer">
                                <Link href="/orders" passHref>
                                    View Orders
                                </Link>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
