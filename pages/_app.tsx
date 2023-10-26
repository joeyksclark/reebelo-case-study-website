import { NextPage } from 'next';

import '../styles/global.css';
import '../styles/poppins.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

type MyAppProps = {
    Component: NextPage;
    pageProps: any;
};

function MyApp({ Component, pageProps }: MyAppProps) {
    return (
        <div>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </div>
    );
}

export default MyApp;
