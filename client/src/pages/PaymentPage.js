import { useEffect } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import PageWrapper from '../components/wrappers/pageWrapper/PageWrapper';

const PaymentPage = () => {
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            'payment_intent_client_secret'
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case 'succeeded':
                    console.log('Payment succeeded!');
                    break;
                case 'processing':
                    console.log('Your payment is processing.');
                    break;
                case 'requires_payment_method':
                    console.log(
                        'Your payment was not successful, please try again.'
                    );
                    break;
                default:
                    console.log('Something went wrong.');
                    break;
            }
        });
    }, [stripe]);

    const payHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/products',
            },
        });
    };

    return (
        <PageWrapper>
            <Box component="form" onSubmit={payHandler}>
                <PaymentElement />
                <Button type="submit">Pay</Button>
            </Box>
        </PageWrapper>
    );
};

export default PaymentPage;
