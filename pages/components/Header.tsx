import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

interface NavLink {
    href: string;
    label: string;
}

const navLinks: NavLink[] = [
    { href: '/products', label: 'View Products' },
    { href: '/orders', label: 'View Orders' },
    { href: '/products/new', label: 'Sell A Product' },
    { href: '/orders/new', label: 'Place Order' }
];

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>Reebelo Case Study
                </Link>
                <nav>
                    <ul className={styles.navList}>
                        {navLinks.map(link => (
                            <li key={link.href} className={styles.navItem}>
                                <Link href={link.href} className={styles.navLink}>{link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
