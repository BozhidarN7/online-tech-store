import { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentForm from '../components/common/navBar/forms/PaymentForm';
import Spinner from '../components/common/Spinner';
import { BUY_PRODUCTS } from '../graphql/mutations';
import { GET_USER_CART_PRODUCTS } from '../graphql/queries';

const stripePromise = loadStripe(
    'pk_test_51KMwuhCMtBKRRxdEknJZbAvHcpa3EieAk3r9qefohnBxEx5g7dXrBAzcQEeNvHrTsRcXFN1r5gYnWbrZlb4T3sVN00U9sQ17Td'
);

const PaymentPage = () => {
    const client = useApolloClient();
    const { cart } = client.readFragment({
        id: `User:${localStorage.getItem('userInfo')}`,
        fragment: gql`
            fragment LoggedUser on User {
                _id
                cart {
                    _id
                    price
                }
            }
        `,
    });
    const [buyProducts, { data }] = useMutation(BUY_PRODUCTS);

    useEffect(() => {
        buyProducts({
            variables: {
                products: cart.map((product) => {
                    return { _id: product._id, price: product.price };
                }),
            },
        });
    }, [buyProducts, cart]);

    if (!data) {
        return <Spinner />;
    }

    const options = {
        clientSecret: data.buyProducts.clientSecret,
    };

    return (
        <>
            {/* <Elements stripe={stripePromise} options={options}> */}
            <PaymentForm></PaymentForm>
            {/* </Elements> */}
        </>
    );
};

export default PaymentPage;
