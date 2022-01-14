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

const ProductCard = () => {
    const openProductInfoHandler = () => {
        console.log('here');
    };

    return (
        <Card sx={{ maxWidth: 345, minWidth: 345 }}>
            <CardActionArea onClick={openProductInfoHandler}>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://s13emagst.akamaized.net/products/9356/9355303/images/res_96dc5dea9778f7998bcd1d78391e0ac3.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Drone YFLY512
                    </Typography>

                    <Grid container rowSpacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body2" component="span">
                                Category: Drone
                            </Typography>
                        </Grid>
                        <Grid sx={{ textAlign: 'right' }} item xs={6}>
                            <Typography variant="body2" component="span">
                                Price: 15 lv.
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" component="span">
                                <Rating name="read-only" value={2} readOnly />
                            </Typography>
                        </Grid>
                        <Grid sx={{ textAlign: 'right' }} item xs={6}>
                            <Typography variant="body2" component="span">
                                Quantity: 5
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
