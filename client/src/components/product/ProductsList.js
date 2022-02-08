import { gql, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';

import * as queries from '../../graphql/queries';
import ProductCard from './ProductCard';
import Spinner from '../common/Spinner';

const ProductsList = () => {
    const { loading, data } = useQuery(queries.GET_All_PRODUCTS);

    const category = useSelector((state) => state.filterings.category);
    const brands = useSelector((state) => state.filterings.brands);
    const sorting = useSelector((state) => state.filterings.sorting);
    const price = useSelector((state) => state.filterings.price);

    if (loading) {
        return <Spinner />;
    }

    let products = data.products.filter(
        (product) =>
            product.price >= price.value[0] && product.price <= price.value[1]
    );

    if (category !== 'all') {
        products = products.filter((product) => product.category === category);
    }

    if (brands.length) {
        products = products.filter((product) =>
            brands.includes(product.brand.toLowerCase())
        );
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
