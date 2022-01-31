import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { AuthProvider } from './contexts/AuthCtx';
import AppRouter from './routes/AppRouter';
import { BUY_PRODUCTS } from './graphql/mutations';

import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe(
    'pk_test_51KMwuhCMtBKRRxdEknJZbAvHcpa3EieAk3r9qefohnBxEx5g7dXrBAzcQEeNvHrTsRcXFN1r5gYnWbrZlb4T3sVN00U9sQ17Td'
);

function App() {
    const [buyProducts, { data }] = useMutation(BUY_PRODUCTS);

    useEffect(() => {
        buyProducts();
    }, [buyProducts]);

    if (!data) {
        return null;
    }

    const options = {
        clientSecret: data.buyProducts.clientSecret,
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <AuthProvider>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <AppRouter />
            </AuthProvider>
        </Elements>
    );
}

export default App;
