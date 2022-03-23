import { useState } from 'react';
import { useQuery } from '@apollo/client';

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
import Button from '@mui/material/Button';

import AddLocationIcon from '@mui/icons-material/AddLocation';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import PageWrapper from '../components/wrappers/pageWrapper/PageWrapper';
import Spinner from '../components/common/Spinner';
import { GET_USER_CART_PRODUCTS } from '../graphql/queries';
import {
    GetUserCartProductsData,
    GetUserCartProductsVars,
} from '../interfaces/gqlQueriesInterfaces';
import OnlinePayment from '../components/common/payments/OnlinePayment';

const PaymentPage = () => {
    const [deliveryMethod, setDeliveryMethod] = useState('toAddress');
    const [paymentWay, setPaymentWay] = useState('cache');

    const userId = localStorage.getItem('userInfo')!;

    const { data: userData, loading } = useQuery<
        GetUserCartProductsData,
        GetUserCartProductsVars
    >(GET_USER_CART_PRODUCTS, {
        variables: {
            id: userId,
        },
    });

    if (loading) {
        return <Spinner only={false} />;
    }

    const cart = userData!.user.cart;

    return (
        <PageWrapper>
            <Grid container spacing={2} sx={{ pl: 3 }}>
                <Grid
                    sx={{ boxShadow: 3, borderRadius: 3, p: 2 }}
                    item
                    container
                    xs={6}
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
                <Grid item xs={6}>
                    <FormControl>
                        <FormLabel id="payment-way-radio-buttons-group-label">
                            Payment method
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="payment-way-radio-buttons-group-label"
                            defaultValue="cache"
                            name="radio-buttons-group"
                            onChange={(e) => setPaymentWay(e.target.value)}
                        >
                            <FormControlLabel
                                value="cache"
                                control={<Radio />}
                                label="Cache"
                            />
                            <FormControlLabel
                                value="online"
                                control={<Radio />}
                                label="Online"
                            />
                        </RadioGroup>
                    </FormControl>
                    {paymentWay === 'cache' ? (
                        <Button
                            variant="contained"
                            sx={{ display: 'block', m: 0 }}
                            type="submit"
                        >
                            Pay
                        </Button>
                    ) : (
                        <OnlinePayment cart={cart} />
                    )}
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
