import { useState } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import BrandMenu from './BrandMenu';
import CategoriesMenu from './CategoriesMenu';
import PriceRangeMenu from './PriceRangeMenu';

const ProductsFilteringMenu = () => {
    const moreThan600 = useMediaQuery('(min-width:600px)');

    const [expandMenus, setExpandMenus] = useState(false);
    return (
        <Box>
            {moreThan600 ? (
                <Typography sx={{ mb: 2 }} variant="h5" component="div">
                    Options menu
                </Typography>
            ) : (
                <Box>
                    <Button
                        sx={{ mb: 2, px: 0 }}
                        size="large"
                        color="inherit"
                        endIcon={<ExpandMoreIcon />}
                        onClick={() => setExpandMenus((prev) => !prev)}
                    >
                        Options menu
                    </Button>
                </Box>
            )}

            {moreThan600 ? (
                <>
                    <CategoriesMenu />
                    <BrandMenu />
                    <PriceRangeMenu />
                </>
            ) : (
                <Collapse in={expandMenus} timeout="auto" unmountOnExit>
                    <CategoriesMenu />
                    <BrandMenu />
                    <PriceRangeMenu />
                </Collapse>
            )}
        </Box>
    );
};

export default ProductsFilteringMenu;
