import Grid from '@mui/material/Grid';

import PageWrapper from '../components/wrappers/pageWrapper/PageWrapper';
import ProductsFilteringMenu from '../components/common/menus/ProductsFilteringMenu';
import ProductsSortingMenu from '../components/common/menus/ProductsSortingMenu';
import ProductsList from '../components/product/ProductsList';

const ProductsPage = () => {
    return (
        <PageWrapper>
            <Grid
                container
                spacing={3}
                sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'center', sm: 'flex-start' },
                }}
            >
                <Grid item lg={3} md={3} sm={4}>
                    <ProductsFilteringMenu />
                </Grid>
                <Grid
                    container
                    item
                    md={9}
                    sm={8}
                    rowSpacing={10}
                    columnSpacing={5}
                    sx={{
                        justifyContent: { sm: 'flex-end', md: 'flex-start' },
                    }}
                >
                    <Grid
                        container
                        item
                        wrap="wrap"
                        sx={{
                            justifyContent: {
                                sm: 'flex-end',
                                md: 'flex-start',
                                xs: 'center',
                            },
                        }}
                    >
                        <ProductsSortingMenu />
                    </Grid>
                    <ProductsList />
                </Grid>
            </Grid>
        </PageWrapper>
    );
};

export default ProductsPage;
