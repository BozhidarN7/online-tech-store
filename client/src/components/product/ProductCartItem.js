import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'mui-image';

import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

import ProductSummary from './ProductSummary';

const ProductCartItem = ({ product }) => {
    return (
        <Grid sx={{ bgcolor: 'white', p: 2, mb: 1 }} item container>
            <Grid item container spacing={3}>
                <Grid item xs={3}>
                    <Image src={product.image} height="10rem" duration={1000} />
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h5" component="h3">
                        {`${product.brand} ${product.model}`}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Tempore alias eaque, amet commodi illo eius optio
                        explicabo voluptate harum odit enim numquam nulla est,
                        quisquam sunt dolorum sit dicta iste.
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <ProductSummary product={product} />
                </Grid>
                <Grid item xs={3}>
                    <Typography
                        sx={{ display: 'block', mb: 2 }}
                        variant="h5"
                        component="span"
                    >
                        {product.price} lv.
                    </Typography>
                    <Button variant="text" startIcon={<FavoriteIcon />}>
                        Add to favorites
                    </Button>
                    <Button variant="text" startIcon={<DeleteIcon />}>
                        Remove
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductCartItem;
