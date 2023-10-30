import React from 'react';
import Link from "next/link";
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>&copy; {currentYear} Nobody. No rights reserved.</p>
                <p>
                    <Link href="/privacy-policy" passHref className={styles.footLink}>
                        Privacy Policy
                    </Link>
                    {' '}
                    |
                    {' '}
                    <Link href="/terms-of-service" passHref className={styles.footLink}>
                        Terms of Service
                    </Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
