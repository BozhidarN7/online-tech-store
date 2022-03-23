import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
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
import {
    GetUserPaymentCardsData,
    GetUserPaymentCardsVars,
} from '../../../interfaces/gqlQueriesInterfaces';
import { GET_USER_PAYMENT_CARDS } from '../../../graphql/queries';
import ConfirmPaymentModal from '../modals/ConfirmPaymentModal';

type Props = {
    cart: Product[];
};

type stripeOptions = {
    clientSecret: string;
};

const stripePromise = loadStripe(
    'pk_test_51KMwuhCMtBKRRxdEknJZbAvHcpa3EieAk3r9qefohnBxEx5g7dXrBAzcQEeNvHrTsRcXFN1r5gYnWbrZlb4T3sVN00U9sQ17Td'
);

const OnlinePayment = ({ cart }: Props) => {
    const [isOpenConfirmPaymentModal, setIsOpenConfirmPaymentModal] =
        useState(false);
    const [finishPayment, setFinishPayment] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentMethodId, setPaymentMethodId] = useState('');

    const userId = localStorage.getItem('userInfo')!;

    let options: stripeOptions = {
        clientSecret: '',
    };

    const { data, loading } = useQuery<
        GetUserPaymentCardsData,
        GetUserPaymentCardsVars
    >(GET_USER_PAYMENT_CARDS, {
        variables: {
            userId: userId,
        },
    });

    const [buyProducts, { data: buyProductsData }] =
        useMutation<BuyProducts>(BUY_PRODUCTS);

    const addPaymentCardHandler = () => {
        setShowPaymentForm(true);
        buyProducts({
            variables: {
                products: cart.map((product: Product) => {
                    return { _id: product._id, price: product.price };
                }),
                userId,
                newCard: true,
            },
        });
    };

    if (loading) {
        return (
            <Box sx={{ m: 2 }}>
                <Spinner only={true} />
            </Box>
        );
    }
    const cards = data!.userPaymentCards;

    if (buyProductsData) {
        options = {
            clientSecret: buyProductsData!.buyProducts.clientSecret,
            // appearance: {
            //     theme: 'stripe',
            // },
        };
    }

    return (
        <>
            {showPaymentForm && options.clientSecret ? (
                <Elements stripe={stripePromise} options={options}>
                    <PaymentForm cart={cart}></PaymentForm>
                </Elements>
            ) : null}

            <Grid container spacing={3} wrap="wrap">
                {cards.map((card) => (
                    <Grid item xs={4} key={card._id}>
                        <PaymentCard
                            card={card}
                            cart={cart}
                            finishPayment={finishPayment}
                            paymentMethodId={paymentMethodId}
                            setIsOpenConfirmPaymentModal={
                                setIsOpenConfirmPaymentModal
                            }
                            setPaymentMethodId={setPaymentMethodId}
                        />
                    </Grid>
                ))}
                {cards.map((card) => (
                    <Grid item xs={4} key={card._id}>
                        <PaymentCard
                            card={card}
                            cart={cart}
                            finishPayment={finishPayment}
                            paymentMethodId={paymentMethodId}
                            setIsOpenConfirmPaymentModal={
                                setIsOpenConfirmPaymentModal
                            }
                            setPaymentMethodId={setPaymentMethodId}
                        />
                    </Grid>
                ))}

                <Grid item xs={4}>
                    <AddPaymentCard
                        addPaymentCardHandler={addPaymentCardHandler}
                    />
                </Grid>
            </Grid>
            <ConfirmPaymentModal
                isOpenConfirmPaymentModal={isOpenConfirmPaymentModal}
                setIsOpenConfirmPaymentModal={setIsOpenConfirmPaymentModal}
                setPaymentMethodId={setPaymentMethodId}
                setFinishPayment={setFinishPayment}
            />
        </>
    );
};

export default OnlinePayment;
