import Grid from '@mui/material/Grid';

import ProductCard from './ProductCard';

const ProductsList = () => {
    return (
        <>
            <Grid item xs={4}>
                <ProductCard />
            </Grid>
            <Grid item xs={4}>
                <ProductCard />
            </Grid>
            <Grid item xs={4}>
                <ProductCard />
            </Grid>
            <Grid item xs={4}>
                <ProductCard />
            </Grid>
            <Grid item xs={4}>
                <ProductCard />
            </Grid>
            <Grid item xs={4}>
                <ProductCard />
            </Grid>
            <Grid item xs={4}>
                <ProductCard />
            </Grid>
        </>
    );
};

export default ProductsList;
