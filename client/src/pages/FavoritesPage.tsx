import { useQuery } from '@apollo/client';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import PageWrapper from '../components/wrappers/pageWrapper/PageWrapper';
import Spinner from '../components/common/Spinner';
import ProductCartItem from '../components/product/ProductCartItem';
import { GET_USER_FAVORITES_PRODUCTS } from '../graphql/queries';
import {
    GetUserFavoritesProductsData,
    GetUserFavoritesProductsVars,
} from '../interfaces/gqlQueriesInterfaces';

const FavoritesPage = () => {
    const { data, loading } = useQuery<
        GetUserFavoritesProductsData,
        GetUserFavoritesProductsVars
    >(GET_USER_FAVORITES_PRODUCTS, {
        variables: {
            id: localStorage.getItem('userInfo')!,
        },
    });

    if (loading) {
        return <Spinner />;
    }

    const products = data!.user.favorites;

    return (
        <PageWrapper>
            <Grid
                sx={{ bgcolor: 'lightblue', p: 2 }}
                container
                justifyContent={'center'}
            >
                <Typography sx={{ mb: 2 }} variant="h4" component="h1">
                    Shopping Cart
                </Typography>
                {products.map((product: any) => (
                    <ProductCartItem
                        key={product._id}
                        product={product}
                        page="favorites"
                    />
                ))}
            </Grid>
        </PageWrapper>
    );
};

export default FavoritesPage;
