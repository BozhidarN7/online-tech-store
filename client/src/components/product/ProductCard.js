import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { useTheme } from '@mui/material/styles';
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

import { useAuth } from '../../contexts/AuthCtx';
import { ADD_TO_FAVORITES, ADD_TO_CART } from '../../graphql/mutations';

const ProductCard = ({ product }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const { firebaseUser } = useAuth();
    const userId = localStorage.getItem('userInfo');

    const [addRemoveToFavorites] = useMutation(ADD_TO_FAVORITES, {
        context: { headers: { 'x-authorization': firebaseUser.accessToken } },
        variables: {
            userId,
            productId: product._id,
        },
    });
    const [addRemoveToCart] = useMutation(ADD_TO_CART, {
        context: { headers: { 'x-authorization': firebaseUser.accessToken } },
        variables: {
            userId,
            productId: product._id,
        },
    });

    const isAddedToFavorites = product.favoriteTo.find((user) => user._id === userId) ? true : false;
    const isAddedToCart = product.inCartTo.find((user) => user._id === userId) ? true : false;

    const openProductInfoHandler = () => {
        navigate(`/products/${product._id}`);
    };

    const addToFavoritesHandler = () => {
        addRemoveToFavorites();
    };
    const addToCartHandler = () => {
        addRemoveToCart();
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
            {firebaseUser ? (
                <CardActions>
                    <IconButton
                        sx={{ color: isAddedToFavorites ? `${theme.palette.secondary.main}` : '' }}
                        onClick={addToFavoritesHandler}
                        aria-label="add to favorites"
                    >
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton
                        sx={{ color: isAddedToCart ? `${theme.palette.secondary.main}` : '' }}
                        onClick={addToCartHandler}
                        aria-label="add to shopping cart"
                    >
                        <ShoppingCartIcon />
                    </IconButton>
                </CardActions>
            ) : null}
        </Card>
    );
};
export default ProductCard;
