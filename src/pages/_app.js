import React from 'react';
import { Provider } from 'react-redux';
import store from '@/store/store';
import './globals.css';
import Navbar from '@/pages/Navbar/Navbar';
import Footer from "./../../components/Footer/index";

function App({ Component, pageProps }) {
    return (

        <Provider store={store}>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
        </Provider>


    );
}

export default App;
