import { gql, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';

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

    const category = useSelector((state) => state.filterings.category);
    const brands = useSelector((state) => state.filterings.brands);
    const sorting = useSelector((state) => state.filterings.sorting);

    if (loading) {
        return (
            <Grid item sx={{ mx: 'auto' }}>
                <Spinner />
            </Grid>
        );
    }

    let products = data.products;

    if (category !== 'all') {
        products = products.filter((product) => product.category === category);
    }

    if (brands.length) {
        products = products.filter((product) => brands.includes(product.brand.toLowerCase()));
    }

    return (
        <>
            {products.map((product) => (
                <Grid key={product._id} item xs={4}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </>
    );
};

export default ProductsList;
