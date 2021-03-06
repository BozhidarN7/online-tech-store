import { useNavigate } from 'react-router-dom';

import { useMediaQuery } from '@mui/material';
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
import { Product, User } from '../../interfaces/coreInterfaces';
import useAddRemoveToCart from '../../hooks/productsHooks/useAddRemoveToCart';

type Props = {
    product: Product;
};

const ProductCard = ({ product }: Props) => {
    const lessThan270 = useMediaQuery('(max-width:270px');

    const theme = useTheme();
    const navigate = useNavigate();

    const { firebaseUser } = useAuth()!;
    const userId = localStorage.getItem('userInfo');

    const { addRemoveToCart, addRemoveToFavorites } = useAddRemoveToCart(
        userId!,
        product._id,
        firebaseUser?.accessToken
    );

    const isAddedToFavorites = product.favoriteTo.find(
        (user: User) => user._id === userId
    )
        ? true
        : false;
    const isAddedToCart = product.inCartTo.find(
        (user: User) => user._id === userId
    )
        ? true
        : false;

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
        <Card>
            <CardActionArea onClick={openProductInfoHandler}>
                <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {`${product.brand} ${product.model}`}
                    </Typography>

                    <Grid
                        container
                        rowSpacing={2}
                        flexDirection={lessThan270 ? 'column' : 'row'}
                    >
                        <Grid item xs={lessThan270 ? 'auto' : 6}>
                            <Typography variant="body2" component="span">
                                Category: {product.category}
                            </Typography>
                        </Grid>
                        <Grid
                            sx={{ textAlign: lessThan270 ? 'left' : 'right' }}
                            item
                            xs={lessThan270 ? 'auto' : 6}
                        >
                            <Typography variant="body2" component="span">
                                Price: {product.price} lv.
                            </Typography>
                        </Grid>
                        <Grid item xs={lessThan270 ? 'auto' : 6}>
                            <Typography variant="body2" component="span">
                                <Rating
                                    name="read-only"
                                    value={product.rating}
                                    readOnly
                                />
                            </Typography>
                        </Grid>
                        <Grid
                            sx={{ textAlign: lessThan270 ? 'left' : 'right' }}
                            item
                            xs={lessThan270 ? 'auto' : 6}
                        >
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
                        sx={{
                            color: isAddedToFavorites
                                ? `${theme.palette.secondary.main}`
                                : '',
                        }}
                        onClick={addToFavoritesHandler}
                        aria-label="add to favorites"
                    >
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: isAddedToCart
                                ? `${theme.palette.secondary.main}`
                                : '',
                        }}
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
