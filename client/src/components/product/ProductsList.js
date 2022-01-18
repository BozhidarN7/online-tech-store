import { gql, useQuery } from '@apollo/client';

import Grid from '@mui/material/Grid';

import ProductCard from './ProductCard';
import Spinner from '../common/Spinner';

const GET_All_PRODUCTS = gql`
    query GetAllProducts {
        products {
            brand
            model
            category
            price
            rating
            quantity
            image
            _id
        }
    }
`;

const ProductsList = () => {
    const { loading, data } = useQuery(GET_All_PRODUCTS);

    if (loading) {
        return (
            <Grid item sx={{ mx: 'auto' }}>
                <Spinner />
            </Grid>
        );
    }

    return (
        <>
            {data.products.map((product) => (
                <Grid key={product._id} item xs={4}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </>
    );
};

export default ProductsList;
