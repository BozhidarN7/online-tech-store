import { useState } from 'react';
import { useQuery } from '@apollo/client';
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

const stripePromise = loadStripe(
    'pk_test_51KMwuhCMtBKRRxdEknJZbAvHcpa3EieAk3r9qefohnBxEx5g7dXrBAzcQEeNvHrTsRcXFN1r5gYnWbrZlb4T3sVN00U9sQ17Td'
);

const OnlinePayment = ({ cart }: Props) => {
    const [isOpenConfirmPaymentModal, setIsOpenConfirmPaymentModal] =
        useState(false);
    const [finishPayment, setFinishPayment] = useState(false);

    const userId = localStorage.getItem('userInfo')!;

    const { data, loading } = useQuery<
        GetUserPaymentCardsData,
        GetUserPaymentCardsVars
    >(GET_USER_PAYMENT_CARDS, {
        variables: {
            userId: userId,
        },
    });

    if (loading) {
        return (
            <Box sx={{ m: 2 }}>
                <Spinner only={true} />
            </Box>
        );
    }

    const cards = data!.userPaymentCards;

    return (
        // <Elements stripe={stripePromise} options={options}>
        //     <PaymentForm cart={cart}></PaymentForm>
        // </Elements>
        <>
            <Grid container spacing={3} wrap="wrap">
                {cards.map((card) => (
                    <Grid item xs={3} key={card._id}>
                        <PaymentCard
                            card={card}
                            cart={cart}
                            setIsOpenConfirmPaymentModal={
                                setIsOpenConfirmPaymentModal
                            }
                            finishPayment={finishPayment}
                        />
                    </Grid>
                ))}

                <Grid item xs={3}>
                    <AddPaymentCard />
                </Grid>
            </Grid>
            <ConfirmPaymentModal
                isOpenConfirmPaymentModal={isOpenConfirmPaymentModal}
                setIsOpenConfirmPaymentModal={setIsOpenConfirmPaymentModal}
                setFinishPayment={setFinishPayment}
            />
        </>
    );
};

export default OnlinePayment;
