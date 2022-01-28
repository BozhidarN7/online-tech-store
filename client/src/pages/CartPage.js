import { useQuery } from '@apollo/client';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import ShopIcon from '@mui/icons-material/Shop';

import PageWrapper from '../components/wrappers/pageWrapper/PageWrapper';
import ProductCartItem from '../components/product/ProductCartItem';
import { GET_USER_CART_PRODUCTS } from '../graphql/queries';
import Spinner from '../components/common/Spinner';

const CartPage = () => {
    const { data, loading } = useQuery(GET_USER_CART_PRODUCTS, {
        variables: {
            id: localStorage.getItem('userInfo'),
        },
    });

    if (loading) {
        return (
            <PageWrapper>
                <Grid container justifyContent={'center'}>
                    <Spinner />
                </Grid>
            </PageWrapper>
        );
    }

    const products = data.user.cart;
    const totalPrice = products
        .reduce((sum, product) => (sum += product.price), 0)
        .toFixed(2);

    return (
        <PageWrapper>
            <Grid container>
                <Grid sx={{ bgcolor: 'lightblue', p: 2, mr: 2 }} item xs={8}>
                    <Typography sx={{ mb: 2 }} variant="h4" component="h1">
                        Shopping Cart
                    </Typography>
                    {products.map((product) => (
                        <ProductCartItem
                            key={product._id}
                            product={product}
                            page="cart"
                        />
                    ))}
                </Grid>
                <Grid
                    sx={{
                        boxShadow: 3,
                        borderRadius: 3,
                        minHeight: 350,
                        maxHeight: 350,
                        ml: 2,
                    }}
                    item
                    xs={3}
                >
                    <Typography sx={{ m: 2 }} variant="h5" component="h2">
                        Information about the order
                    </Typography>
                    <Box sx={{ borderBottom: 1, p: 2, textAlign: 'center' }}>
                        <Typography variant="h6" component="p">
                            Total:
                        </Typography>
                        <Typography variant="h6" component="p">
                            {totalPrice} lv.
                        </Typography>
                        <Button
                            sx={{ width: 182 }}
                            variant="contained"
                            startIcon={<ShopIcon />}
                        >
                            Continue
                        </Button>
                    </Box>
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                        <Typography>Add promo code</Typography>
                        <TextField
                            id="standard-basic"
                            label="Promo code"
                            variant="standard"
                        />
                        <Button sx={{ width: 182, mt: 1 }} variant="outlined">
                            Add code
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </PageWrapper>
    );
};

export default CartPage;
