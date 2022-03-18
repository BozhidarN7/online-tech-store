import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import ShopIcon from '@mui/icons-material/Shop';

import { useAppSelector } from '../app/hooks';
import { GET_USER_CART_PRODUCTS } from '../graphql/queries';
import PageWrapper from '../components/wrappers/pageWrapper/PageWrapper';
import ProductCartItem from '../components/product/ProductCartItem';
import Spinner from '../components/common/Spinner';
import {
    GetUserCartProductsData,
    GetUserCartProductsVars,
} from '../interfaces/gqlQueriesInterfaces';
import { Product } from '../interfaces/coreInterfaces';

const CartPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { data, loading } = useQuery<
        GetUserCartProductsData,
        GetUserCartProductsVars
    >(GET_USER_CART_PRODUCTS, {
        variables: {
            id: localStorage.getItem('userInfo')!,
        },
    });

    const productsQuantity = useAppSelector(
        (state) => state.users.productsQuantity
    );

    if (loading) {
        return <Spinner only={false} />;
    }

    const products = data!.user.cart;

    const totalPrice = products
        .reduce((sum: number, product: Product) => {
            const productQuantity = productsQuantity.find(
                (pq: any) => pq._id === product._id
            );
            if (productQuantity) {
                return (sum += productQuantity.quantity * product.price);
            }
            return (sum += product.price);
        }, 0)
        .toFixed(2);

    return (
        <PageWrapper>
            <Grid container>
                {products.length ? (
                    <Grid
                        sx={{
                            bgcolor:
                                theme.palette.mode === 'dark'
                                    ? theme.palette.divider
                                    : 'lightblue',
                            p: 2,
                            mr: 2,
                        }}
                        item
                        xs={8}
                    >
                        <Typography sx={{ mb: 2 }} variant="h4" component="h1">
                            Shopping Cart
                        </Typography>
                        {products.map((product: Product) => (
                            <ProductCartItem
                                key={product._id}
                                product={product}
                                page="cart"
                            />
                        ))}
                    </Grid>
                ) : (
                    <Grid item xs={8}>
                        <Typography variant="h4" component="h2">
                            You have not added any products yet.
                        </Typography>
                    </Grid>
                )}
                <Grid
                    sx={{
                        bgcolor:
                            theme.palette.mode === 'dark' ? '#213852' : 'white',
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
                            onClick={() => navigate('/payment')}
                            disabled={products.length ? false : true}
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
                        <Button
                            sx={{
                                width: 182,
                                mt: 1,
                                display: 'block',
                                mx: 'auto',
                            }}
                            variant="outlined"
                            disabled={products.length ? false : true}
                        >
                            Add code
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </PageWrapper>
    );
};

export default CartPage;
