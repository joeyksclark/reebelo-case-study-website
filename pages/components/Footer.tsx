import React from 'react';
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Nobody. No rights reserved.</p>
                <p>
                    <Link href="/privacy-policy" className="text-blue-400 hover:underline">
                        Privacy Policy
                    </Link>{' '}
                    |{' '}
                    <Link href="/terms-of-service" className="text-blue-400 hover:underline">
                        Terms of Service
                    </Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
