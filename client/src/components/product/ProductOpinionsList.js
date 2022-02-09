import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ProductOpinion from './ProductOpinion';

const ProductOpinionsList = ({ product }) => {
    return (
        <Box sx={{ mt: 5 }}>
            <Typography sx={{ mb: 2 }} variant="h5" component="h2">
                Opinions
            </Typography>
            <Grid
                sx={{ boxShadow: 1, borderRadius: 2, p: 2 }}
                container
                direction="column"
                spacing={3}
            >
                <ProductOpinion product={product} />
            </Grid>
        </Box>
    );
};

export default ProductOpinionsList;
