import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { AuthProvider } from './contexts/AuthCtx';
import AppRouter from './routes/AppRouter';

import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe(
    'pk_test_51KMwuhCMtBKRRxdEknJZbAvHcpa3EieAk3r9qefohnBxEx5g7dXrBAzcQEeNvHrTsRcXFN1r5gYnWbrZlb4T3sVN00U9sQ17Td'
);

function App() {
    const options = {
        clientSecret:
            'sk_test_51KMwuhCMtBKRRxdEbdjl0h4vx3sm7aTRmo4KC2zxWvBggj2cJ09XIwDO96QXUqykoPDRyn00B11kwhaD7ONoVXoH00dfdA7sYk',
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
