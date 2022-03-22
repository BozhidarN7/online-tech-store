import Grid from '@mui/material/Grid';

import PageWrapper from '../components/wrappers/pageWrapper/PageWrapper';
import ProductsFilteringMenu from '../components/common/menus/ProductsFilteringMenu';
import ProductsSortingMenu from '../components/common/menus/ProductsSortingMenu';
import ProductsList from '../components/product/ProductsList';

const ProductsPage = () => {
    return (
        <PageWrapper>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <ProductsFilteringMenu />
                </Grid>
                <Grid container item xs={9} rowSpacing={10} columnSpacing={5}>
                    <Grid container item xs={12}>
                        <ProductsSortingMenu />
                    </Grid>
                    <ProductsList />
                </Grid>
            </Grid>
        </PageWrapper>
    );
};

export default ProductsPage;
