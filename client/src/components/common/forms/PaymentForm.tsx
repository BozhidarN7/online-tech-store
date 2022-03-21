import React, { useEffect } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { REDUCE_QUANTITIES } from '../../../graphql/mutations';
import {
    ReduceQauntitiesData,
    ReduceQauntitiesVars,
} from '../../../interfaces/gqlMutationsInterfaces';
import { productsQuantityRemove } from '../../../features/usersSlice';
import { Product } from '../../../interfaces/coreInterfaces';

type Props = {
    cart: Product[];
};

const PaymentForm = ({ cart }: Props) => {
    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useAppDispatch();

    const productsQuantity = useAppSelector(
        (state) => state.users.productsQuantity
    );

    const [reduceQuantities] = useMutation<
        { reduceQuantities: ReduceQauntitiesData },
        ReduceQauntitiesVars
    >(REDUCE_QUANTITIES, {
        variables: {
            productsIds: [
                ...productsQuantity.map((product: Product) => product._id),
                ...cart
                    .map((product: Product) => {
                        const find = productsQuantity.find(
                            (pr: Product) => pr._id === product._id
                        );

                        if (find) return null;
                        return product._id;
                    })
                    .filter((pr) => pr),
            ],
            quantities: [
                ...productsQuantity.map((product: Product) => product.quantity),
                ...cart
                    .map((product: Product) => {
                        const find = productsQuantity.find(
                            (pr: Product) => pr._id === product._id
                        );

                        if (find) return null;
                        return 1;
                    })
                    .filter((pr) => pr),
            ],
        },
    });

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
            switch (paymentIntent?.status) {
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

    const payHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        reduceQuantities();
        dispatch(productsQuantityRemove);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/products',
            },
        });

        if (error.type === 'card_error' || error.type === 'validation_error') {
            console.log(error.message);
        } else {
            console.log('An unexpected error occured.');
        }
    };

    return (
        <>
            {stripe && elements && (
                <Box component="form" onSubmit={payHandler} sx={{ my: 3 }}>
                    <PaymentElement />

                    <Button
                        variant="contained"
                        sx={{ mt: 1, mr: 1 }}
                        type="submit"
                    >
                        Pay
                    </Button>
                    <FormControlLabel
                        sx={{ mt: 1.2 }}
                        control={<Checkbox />}
                        label="Remember my card"
                    />
                </Box>
            )}
        </>
    );
};

export default PaymentForm;
