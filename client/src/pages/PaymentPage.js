import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import AddLocationIcon from '@mui/icons-material/AddLocation';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import PaymentForm from '../components/common/navBar/forms/PaymentForm';
import PageWrapper from '../components/wrappers/pageWrapper/PageWrapper';
import Spinner from '../components/common/Spinner';
import ProductCard from '../components/product/ProductCard';
import { BUY_PRODUCTS } from '../graphql/mutations';
import { GET_USER_CART_PRODUCTS } from '../graphql/queries';

const stripePromise = loadStripe(
    'pk_test_51KMwuhCMtBKRRxdEknJZbAvHcpa3EieAk3r9qefohnBxEx5g7dXrBAzcQEeNvHrTsRcXFN1r5gYnWbrZlb4T3sVN00U9sQ17Td'
);

const PaymentPage = () => {
    const [deliveryMethod, setDeliveryMethod] = useState('toAddress');

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
        <PageWrapper>
            <Grid container spacing={2}>
                <Grid
                    sx={{ boxShadow: 1, borderRadius: 3, p: 2 }}
                    item
                    container
                    xs={8}
                    direction="column"
                >
                    <Grid item>
                        <Box sx={{ mb: 0.8, bgcolor: '#F8F8F8' }}>
                            <AddLocationIcon sx={{ mr: 1 }} />
                            <Typography variant="h6" component="span">
                                Destination town
                            </Typography>
                        </Box>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={towns}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Town" />
                            )}
                        />
                    </Grid>
                    <Grid item container sx={{ my: 2 }} spacing={5}>
                        <Grid item>
                            <Box sx={{ mb: 0.8, bgcolor: '#F8F8F8' }}>
                                <LocalShippingIcon sx={{ mr: 1 }} />
                                <Typography variant="h6" component="span">
                                    Choose delivery method
                                </Typography>
                            </Box>
                            <FormControl>
                                <FormLabel id="delivery-methods">
                                    Delivery method
                                </FormLabel>
                                <RadioGroup
                                    aria-labelledby="delivery-methods"
                                    name="controlled-radio-buttons-group"
                                    value={deliveryMethod}
                                    onChange={(e) =>
                                        setDeliveryMethod(e.target.value)
                                    }
                                >
                                    <FormControlLabel
                                        value="toAddress"
                                        control={<Radio />}
                                        label="To address"
                                    />
                                    <FormControlLabel
                                        value="econt"
                                        control={<Radio />}
                                        label="Econt"
                                    />
                                    <FormControlLabel
                                        value="speedy"
                                        control={<Radio />}
                                        label="Speedy"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Box sx={{ bgcolor: '#F8F8F8' }}>
                                <Typography variant="h6" component="span">
                                    Delivery info
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 1 }}>
                                <TextField
                                    sx={{ mr: 2 }}
                                    id="standard-basic"
                                    label="Name"
                                    variant="standard"
                                />
                                <TextField
                                    id="standard-basic"
                                    label="Phone"
                                    variant="standard"
                                />
                            </Box>
                            <FormControl fullWidth variant="standard">
                                <TextField
                                    id="standard-basic"
                                    label="Adress"
                                    variant="standard"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Elements stripe={stripePromise} options={options}>
                        <PaymentForm></PaymentForm>
                    </Elements>
                </Grid>
            </Grid>
        </PageWrapper>
    );
};

const towns = [
    { label: 'Plovdiv' },
    { label: 'Sofia' },
    { label: 'Varna' },
    { label: 'Burgas' },
    { label: 'Pleven' },
];

export default PaymentPage;
