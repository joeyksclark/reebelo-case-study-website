import { AppProps } from 'next/app';

import '../styles/global.css';
import '../styles/poppins.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </div>
    );
}

export default MyApp;
