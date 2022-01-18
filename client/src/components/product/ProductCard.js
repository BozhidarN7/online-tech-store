import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductCard = ({ product }) => {
    const openProductInfoHandler = () => {
        console.log('here');
    };

    return (
        <Card sx={{ maxWidth: 345, minWidth: 345 }}>
            <CardActionArea onClick={openProductInfoHandler}>
                <CardMedia component="img" height="140" image={product.image} alt="green iguana" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {`${product.brand} ${product.model}`}
                    </Typography>

                    <Grid container rowSpacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body2" component="span">
                                Category: {product.category}
                            </Typography>
                        </Grid>
                        <Grid sx={{ textAlign: 'right' }} item xs={6}>
                            <Typography variant="body2" component="span">
                                Price: {product.price} lv.
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" component="span">
                                <Rating name="read-only" value={product.rating} readOnly />
                            </Typography>
                        </Grid>
                        <Grid sx={{ textAlign: 'right' }} item xs={6}>
                            <Typography variant="body2" component="span">
                                Quantity: {product.quantity}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="add to shopping cart">
                    <ShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};
export default ProductCard;
