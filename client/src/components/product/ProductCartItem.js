import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'mui-image';

import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

import ProductSummary from './ProductSummary';

const ProductCartItem = () => {
    return (
        <Grid sx={{ bgcolor: 'white', p: 2, mb: 1 }} item container>
            <Grid item container spacing={3}>
                <Grid item xs={3}>
                    <Image
                        src="https://www.laptop.bg/system/images/132581/original/Legion_Y520.jpg"
                        height="10rem"
                        duration={1000}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h5" component="h3">
                        Lenovo Legion_Y520
                    </Typography>
                    <Typography variant="body2" component="p">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Tempore alias eaque, amet commodi illo eius optio
                        explicabo voluptate harum odit enim numquam nulla est,
                        quisquam sunt dolorum sit dicta iste.
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <ProductSummary />
                </Grid>
                <Grid item xs={3}>
                    <Typography
                        sx={{ display: 'block', mb: 2 }}
                        variant="h5"
                        component="span"
                    >
                        1222 lv.
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
