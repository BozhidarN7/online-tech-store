import { useQuery } from '@apollo/client';

import { useAppSelector } from '../../app/hook';
import Grid from '@mui/material/Grid';

import {
    GetAllProductsData,
    GetAllProductsVars,
} from '../../interfaces/gqlQueriesInterfaces';
import * as queries from '../../graphql/queries';
import ProductCard from './ProductCard';
import Spinner from '../common/Spinner';

const ProductsList = () => {
    const category = useAppSelector((state) => state.filterings.category);
    const brands = useAppSelector((state) => state.filterings.brands);
    const sorting = useAppSelector((state) => state.filterings.sorting);
    const price = useAppSelector((state) => state.filterings.price);
    let view = useAppSelector((state) => state.filterings.view);

    if (view === '') {
        view = 10 + '';
    }

    const { loading, data } = useQuery<GetAllProductsData, GetAllProductsVars>(
        queries.GET_All_PRODUCTS,
        {
            variables: { limit: Number(view) },
        }
    );

    if (loading) {
        return <Spinner />;
    }

    let products = data!.products.filter(
        (product: any) =>
            product.price >= price.value[0] && product.price <= price.value[1]
    );

    if (category !== 'all') {
        products = products.filter(
            (product: any) => product.category === category
        );
    }

    if (brands.length) {
        products = products.filter((product: any) =>
            brands.includes(product.brand.toLowerCase())
        );
    }

    if (sorting === '') {
        products.sort(
            (a: any, b: any) =>
                new Date(+a.createdAt).getTime() -
                new Date(+b.createdAt).getTime()
        );
    }
    if (sorting === 'newest') {
        products.sort(
            (a: any, b: any) =>
                new Date(+b.createdAt).getTime() -
                new Date(+a.createdAt).getTime()
        );
    }
    if (sorting === 'lowest') {
        products.sort((a: any, b: any) => a.price - b.price);
    }
    if (sorting === 'highest') {
        products.sort((a: any, b: any) => b.price - a.price);
    }

    return (
        <>
            {products.map((product: any) => (
                <Grid key={product._id} item xs={4}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </>
    );
};

export default ProductsList;
