import Head from 'next/head';
import Footer from './Footer';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ title, children }) {
    return (
        <>
            <Head>
                <title>{title ? title + '- E-commerce' : 'E-commerce'}</title>
                <meta name="description" content="E-commerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ToastContainer position="bottom-center" limit={1} />
            <div className="flex min-h-screen flex-col justify-between">
                <header>
                    <Navbar />
                </header>
                <main className="container m-auto mt-3 mb-4 px-4">
                    {children}
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    );
}
