import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import BrandMenu from './BrandMenu';
import ProductsMenu from './ProductsMenu';
import PriceRangeMenu from './PriceRangeMenu';

const ProductsFilteringMenu = () => {
    return (
        <Box>
            <Typography sx={{ mb: 2 }} variant="h5" component="div">
                Options menu
            </Typography>

            <ProductsMenu />
            <BrandMenu />
            <PriceRangeMenu />
        </Box>
    );
};

export default ProductsFilteringMenu;
