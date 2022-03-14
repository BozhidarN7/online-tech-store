import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'mui-image';

import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

import { useAuth } from '../../contexts/AuthCtx';
import ProductSummary from './ProductSummary';
import useAddRemoveToCartAndFavorites from '../../hooks/productsHooks/useAddRemoveToCart';
import { Product, User } from '../../interfaces/coreInterfaces';

type Props = {
    page: string;
    product: Product;
};

const ProductCartItem = ({ product, page }: Props) => {
    const theme = useTheme();
    const { firebaseUser } = useAuth()!;
    const userId = localStorage.getItem('userInfo');
    const { addRemoveToFavorites, addRemoveToCart } =
        useAddRemoveToCartAndFavorites(
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

    const addRemoveToFavoritesHandler = () => {
        addRemoveToFavorites();
    };

    const addRemoveToCartHandler = () => {
        addRemoveToCart();
    };

    const removeProductHandler = () => {
        if (page === 'cart') {
            addRemoveToCart();
        } else {
            addRemoveToFavorites();
        }
    };

    return (
        <Grid
            sx={{
                bgcolor: theme.palette.mode === 'dark' ? '#213852' : 'white',
                p: 2,
                mb: 1,
            }}
            item
            container
        >
            <Grid item container spacing={3}>
                <Grid item xs={3}>
                    <Image src={product.image} height="10rem" duration={1000} />
                </Grid>
                <Grid item xs={3}>
                    <Link to={`/products/${product._id}`}>
                        <Typography
                            sx={{
                                color:
                                    theme.palette.mode === 'dark'
                                        ? theme.palette.secondary.main
                                        : 'black',
                            }}
                            variant="h5"
                            component="h2"
                        >
                            {`${product.brand} ${product.model}`}
                        </Typography>
                    </Link>
                    <Typography variant="body2" component="p">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Tempore alias eaque, amet commodi illo eius optio
                        explicabo voluptate harum odit enim numquam nulla est,
                        quisquam sunt dolorum sit dicta iste.
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <ProductSummary product={product} page={page} />
                </Grid>
                <Grid item xs={3}>
                    <Typography
                        sx={{ display: 'block', mb: 2 }}
                        variant="h5"
                        component="span"
                    >
                        {product.price} lv.
                    </Typography>
                    {page === 'cart' ? (
                        <Button
                            sx={{
                                color: isAddedToFavorites
                                    ? `${theme.palette.secondary.main}`
                                    : '',
                            }}
                            variant="text"
                            startIcon={<FavoriteIcon />}
                            onClick={addRemoveToFavoritesHandler}
                        >
                            Add to favorites
                        </Button>
                    ) : (
                        <Button
                            sx={{
                                color: isAddedToCart
                                    ? `${theme.palette.secondary.main}`
                                    : '',
                            }}
                            variant="text"
                            startIcon={<ShoppingCart />}
                            onClick={addRemoveToCartHandler}
                        >
                            Add to cart
                        </Button>
                    )}
                    <Button
                        variant="text"
                        startIcon={<DeleteIcon />}
                        onClick={removeProductHandler}
                    >
                        Remove
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductCartItem;
