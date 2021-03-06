import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import {
    CardMedia,
    Grid,
    Box,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Rating,
    IconButton,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GppGoodIcon from '@mui/icons-material/GppGood';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { GET_PRODUCT, GET_USER_BY_ID } from '../graphql/queries';
import { RATE_PRODUCT } from '../graphql/mutations';
import { useAuth } from '../contexts/AuthCtx';
import PageWrapper from '../components/wrappers/pageWrapper/PageWrapper';
import Spinner from '../components/common/Spinner';
import ProductQuantity from '../components/product/ProductQuatity';
import ProductOpinionsList from '../components/product/ProductOpinionsList';
import ProductSpecification from '../components/product/ProductSpecification';
import UserOpinionForm from '../components/common/forms/UserOpinionForm';
import useAddRemoveToCartAndFavorites from '../hooks/productsHooks/useAddRemoveToCart';
import React from 'react';
import {
    GetProductData,
    GetProductVars,
    GetUserData,
    GetUserVars,
} from '../interfaces/gqlQueriesInterfaces';
import { Rating as ProductRating, User } from '../interfaces/coreInterfaces';

const ProductInfoPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { id } = useParams();

    const userId = localStorage.getItem('userInfo');
    const { firebaseUser } = useAuth()!;
    const { data: userData, loading: loadingUser } = useQuery<
        GetUserData,
        GetUserVars
    >(GET_USER_BY_ID, {
        variables: {
            id: userId,
        },
        nextFetchPolicy: 'network-only',
    });

    const { data: productData, loading: loadingProduct } = useQuery<
        GetProductData,
        GetProductVars
    >(GET_PRODUCT, {
        variables: {
            id,
        },
        nextFetchPolicy: 'network-only',
    });

    const { addRemoveToCart, addRemoveToFavorites } =
        useAddRemoveToCartAndFavorites(
            userId!,
            productData ? productData.product._id : '',
            firebaseUser?.accessToken
        );
    const [rate] = useMutation(RATE_PRODUCT, {
        refetchQueries: [GET_PRODUCT, GET_USER_BY_ID],
    });

    if (loadingUser || loadingProduct) {
        return <Spinner only={false} />;
    }

    const product = productData!.product;
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

    const productRating = userData!.user.ratings.find(
        (pr: ProductRating) => pr.product === product._id
    );
    const isRated = productRating ? true : false;
    const rating = productRating ? productRating.rating : 0;

    const addToFavoritesHandler = () => {
        addRemoveToFavorites({
            context: {
                headers: { 'x-authorization': firebaseUser?.accessToken },
            },
            variables: {
                userId: userId,
                productId: product._id,
            },
            refetchQueries: [GET_PRODUCT],
        });
    };
    const addToCartHandler = () => {
        addRemoveToCart({
            context: {
                headers: { 'x-authorization': firebaseUser?.accessToken },
            },
            variables: {
                userId: userId,
                productId: product._id,
            },
            refetchQueries: [GET_PRODUCT],
        });
    };

    const rateHandler = (e: React.SyntheticEvent, rating: number | null) => {
        rate({
            variables: {
                userId,
                productId: product._id,
                rating,
            },
        });
    };

    return (
        <PageWrapper>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <IconButton onClick={() => navigate(-1)}>
                        <KeyboardBackspaceIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={5}>
                    <Box>
                        <Typography variant="h4" component="h1">
                            {`${product.brand} ${product.model}`}
                        </Typography>
                        <CardMedia
                            sx={{ boxShadow: 1 }}
                            component="img"
                            height="400"
                            image={product.image}
                            alt="drone"
                        />
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Typography
                        sx={{ mt: 4, mb: 2 }}
                        variant="h6"
                        component="div"
                    >
                        Main characteristics
                    </Typography>
                    <List>
                        <ListItem sx={{ m: 0, p: 0 }}>
                            <ListItemIcon>
                                <DoneIcon
                                    sx={{
                                        color:
                                            theme.palette.mode === 'dark'
                                                ? theme.palette.secondary.main
                                                : 'blue',
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Fast" />
                        </ListItem>
                        <ListItem sx={{ m: 0, p: 0 }}>
                            <ListItemIcon>
                                <DoneIcon
                                    sx={{
                                        color:
                                            theme.palette.mode === 'dark'
                                                ? theme.palette.secondary.main
                                                : 'blue',
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Long distance" />
                        </ListItem>
                        <ListItem sx={{ m: 0, p: 0 }}>
                            <ListItemIcon>
                                <DoneIcon
                                    sx={{
                                        color:
                                            theme.palette.mode === 'dark'
                                                ? theme.palette.secondary.main
                                                : 'blue',
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Higher attitude" />
                        </ListItem>
                    </List>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" component="legend">
                            {isRated ? 'Your rating' : 'Give your rating'}
                        </Typography>
                        <Rating
                            name="no-value"
                            value={rating}
                            onChange={rateHandler}
                            readOnly={isRated ? true : false}
                        />
                    </Box>
                    <ProductQuantity product={product} />
                </Grid>
                <Grid sx={{ mt: 4 }} item xs={4}>
                    <Box
                        sx={{
                            boxShadow: 2,
                            border: 1,
                            borderColor: `${theme.palette.primary.main}`,
                            borderRadius: 2,
                        }}
                    >
                        <Grid container direction="column">
                            <List>
                                <ListItem
                                    sx={{
                                        m: 0,
                                        p: 0,
                                        height: 100,
                                        borderBottom: 1,
                                        textAlign: 'center',
                                    }}
                                >
                                    <ListItemText
                                        primaryTypographyProps={{
                                            color: `${theme.palette.info.dark}`,
                                            variant: 'h4',
                                        }}
                                        primary={`$${product.price}`}
                                        secondary={
                                            <Rating
                                                name="read-only"
                                                value={product.rating}
                                                readOnly
                                            />
                                        }
                                    />
                                </ListItem>
                                <ListItem sx={{ height: 100, borderBottom: 1 }}>
                                    <ListItemIcon>
                                        <CheckCircleIcon
                                            sx={{
                                                fontSize: 40,
                                                color: `${theme.palette.success.light}`,
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primaryTypographyProps={{
                                            color: `${theme.palette.success.light}`,
                                            variant: 'h6',
                                        }}
                                        primary="In stock"
                                        secondary="Order now and the product will  be deliver to you two working days."
                                    />
                                </ListItem>
                                <ListItem sx={{ height: 100, borderBottom: 1 }}>
                                    <ListItemIcon>
                                        <GppGoodIcon
                                            sx={{
                                                fontSize: 40,
                                                color: `${theme.palette.success.light}`,
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primaryTypographyProps={{
                                            color: `${theme.palette.success.light}`,
                                            variant: 'h6',
                                        }}
                                        primary="24 months guarantee"
                                    />
                                </ListItem>
                            </List>
                            <Button
                                sx={{
                                    m: 2,
                                    bgcolor: isAddedToCart
                                        ? `${theme.palette.secondary.main}`
                                        : '',
                                    '&:hover': {
                                        bgcolor: isAddedToCart
                                            ? `${theme.palette.secondary.dark}`
                                            : '',
                                    },
                                }}
                                variant="contained"
                                onClick={addToCartHandler}
                                startIcon={<ShoppingCartIcon />}
                            >
                                Add to cart
                            </Button>
                            <Button
                                sx={{
                                    m: 2,
                                    bgcolor: isAddedToFavorites
                                        ? `${theme.palette.secondary.main}`
                                        : '',
                                    '&:hover': {
                                        bgcolor: isAddedToFavorites
                                            ? `${theme.palette.secondary.dark}`
                                            : '',
                                    },
                                }}
                                variant="contained"
                                onClick={addToFavoritesHandler}
                                startIcon={<FavoriteIcon />}
                            >
                                Add to favorite
                            </Button>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <ProductSpecification product={product} />
            <ProductOpinionsList productId={product._id} />
            <UserOpinionForm productId={product._id} />
        </PageWrapper>
    );
};

export default ProductInfoPage;
