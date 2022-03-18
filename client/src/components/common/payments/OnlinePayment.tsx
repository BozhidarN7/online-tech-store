import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { Product } from '../../../interfaces/coreInterfaces';
import { BUY_PRODUCTS } from '../../../graphql/mutations';
import { BuyProducts } from '../../../interfaces/gqlMutationsInterfaces';
import PaymentForm from '../forms/PaymentForm';
import Spinner from '../Spinner';
import PaymentCard from './PaymentCard';
import AddPaymentCard from './AddPaymentCard';

type Props = {
    cart: Product[];
};

const stripePromise = loadStripe(
    'pk_test_51KMwuhCMtBKRRxdEknJZbAvHcpa3EieAk3r9qefohnBxEx5g7dXrBAzcQEeNvHrTsRcXFN1r5gYnWbrZlb4T3sVN00U9sQ17Td'
);

const OnlinePayment = ({ cart }: Props) => {
    const userId = localStorage.getItem('userInfo');
    const [buyProducts, { data }] = useMutation<BuyProducts>(BUY_PRODUCTS);

    useEffect(() => {
        buyProducts({
            variables: {
                products: cart.map((product: Product) => {
                    return { _id: product._id, price: product.price };
                }),
                userId,
            },
        });
    }, [buyProducts, cart, userId]);

    if (!data) {
        return (
            <Box sx={{ m: 2 }}>
                <Spinner only={true} />
            </Box>
        );
    }

    const options = {
        clientSecret: data!.buyProducts.clientSecret,
        // appearance: {
        //     theme: 'stripe',
        // },
    };

    return (
        // <Elements stripe={stripePromise} options={options}>
        //     <PaymentForm cart={cart}></PaymentForm>
        // </Elements>
        <Grid container spacing={3} wrap="wrap">
            <Grid item xs={3}>
                <PaymentCard />
            </Grid>
            <Grid item xs={3}>
                <PaymentCard />
            </Grid>
            <Grid item xs={3}>
                <PaymentCard />
            </Grid>
            <Grid item xs={3}>
                <PaymentCard />
            </Grid>
            <Grid item xs={3}>
                <PaymentCard />
            </Grid>
            <Grid item xs={3}>
                <PaymentCard />
            </Grid>
            <Grid item xs={3}>
                <AddPaymentCard />
            </Grid>
        </Grid>
    );
};

export default OnlinePayment;
