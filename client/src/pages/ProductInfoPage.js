import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
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
    Avatar,
    TextField,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GppGoodIcon from '@mui/icons-material/GppGood';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { GET_PRODUCT } from '../graphql/queries';
import PageWrapper from '../components/wrappers/pageWrapper/PageWrapper';
import Spinner from '../components/common/Spinner';

const ProductInfoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

    const userId = localStorage.getItem('userInfo');

    const { loading, data } = useQuery(GET_PRODUCT, {
        variables: {
            id,
        },
    });

    if (loading) {
        return <Spinner />;
    }

    const product = data.product;
    const isAddedToFavorites = product.favoriteTo.find(
        (user) => user._id === userId
    )
        ? true
        : false;
    const isAddedToCart = product.inCartTo.find((user) => user._id === userId)
        ? true
        : false;

    return (
        <PageWrapper>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <IconButton onClick={() => navigate('/products')}>
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
                                <DoneIcon sx={{ color: 'blue' }} />
                            </ListItemIcon>
                            <ListItemText primary="Fast" />
                        </ListItem>
                        <ListItem sx={{ m: 0, p: 0 }}>
                            <ListItemIcon>
                                <DoneIcon sx={{ color: 'blue' }} />
                            </ListItemIcon>
                            <ListItemText primary="Long distance" />
                        </ListItem>
                        <ListItem sx={{ m: 0, p: 0 }}>
                            <ListItemIcon>
                                <DoneIcon sx={{ color: 'blue' }} />
                            </ListItemIcon>
                            <ListItemText primary="Higher attitude" />
                        </ListItem>
                    </List>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" component="legend">
                            Give your rating
                        </Typography>
                        <Rating name="no-value" value={null} />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Typography component="span">Quantity:</Typography>
                        <IconButton component="span">
                            <RemoveCircleIcon />
                        </IconButton>
                        <Typography component="span">1</Typography>
                        <IconButton component="span">
                            <AddCircleIcon />
                        </IconButton>
                    </Box>
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
                                sx={{ m: 2 }}
                                variant="contained"
                                startIcon={<ShoppingCartIcon />}
                                disabled={isAddedToCart}
                            >
                                Add to cart
                            </Button>
                            <Button
                                sx={{ m: 2 }}
                                variant="contained"
                                startIcon={<FavoriteIcon />}
                                disabled={isAddedToFavorites}
                            >
                                Add to favorite
                            </Button>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Box>
                <Typography variant="h5" component="h2">
                    Full description
                </Typography>
                <Box sx={{ mt: 1, p: 2, boxShadow: 1 }}>
                    <Box component="p">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam adipisci tempora odit neque fugit tenetur. Vel
                        fugiat repellat corrupti ducimus officiis, obcaecati,
                        commodi nam ad quasi harum modi enim sapiente! Lorem
                        ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam adipisci tempora odit neque fugit tenetur. Vel
                        fugiat repellat corrupti ducimus officiis, obcaecati,
                        commodi nam ad quasi harum modi enim sapiente! Lorem
                        ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam adipisci tempora odit neque fugit tenetur. Vel
                        fugiat repellat corrupti ducimus officiis, obcaecati,
                        commodi nam ad quasi harum modi enim sapiente!
                    </Box>
                    <Box component="p">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam adipisci tempora odit neque fugit tenetur. Vel
                        fugiat repellat corrupti ducimus officiis, obcaecati,
                        commodi nam ad quasi harum modi enim sapiente! Lorem
                        ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam adipisci tempora odit neque fugit tenetur. Vel
                        fugiat repellat corrupti ducimus officiis, obcaecati,
                        commodi nam ad quasi harum modi enim sapiente! Lorem
                        ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam adipisci tempora odit neque fugit tenetur. Vel
                        fugiat repellat corrupti ducimus officiis, obcaecati,
                        commodi nam ad quasi harum modi enim sapiente!
                    </Box>
                    <Box component="p">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam adipisci tempora odit neque fugit tenetur. Vel
                        fugiat repellat corrupti ducimus officiis, obcaecati,
                        commodi nam ad quasi harum modi enim sapiente! Lorem
                        ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam adipisci tempora odit neque fugit tenetur. Vel
                        fugiat repellat corrupti ducimus officiis, obcaecati,
                        commodi nam ad quasi harum modi enim sapiente! Lorem
                        ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam adipisci tempora odit neque fugit tenetur. Vel
                        fugiat repellat corrupti ducimus officiis, obcaecati,
                        commodi nam ad quasi harum modi enim sapiente!
                    </Box>
                </Box>
            </Box>
            <Box sx={{ mt: 5 }}>
                <Typography sx={{ mb: 2 }} variant="h5" component="h2">
                    Opinions
                </Typography>
                <Grid
                    sx={{ boxShadow: 1, borderRadius: 2, p: 1 }}
                    container
                    direction="column"
                    spacing={3}
                >
                    <Grid sx={{ boxShadow: 1, borderRadius: 2 }} item container>
                        <Grid item xs={1}>
                            <Avatar>H</Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography component="p">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Soluta, error blanditiis enim
                                pariatur illum nesciunt est minus sapiente
                                reiciendis. Minus a reprehenderit maiores
                                commodi velit laudantium labore ex nisi
                                temporibus?
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid sx={{ boxShadow: 1, borderRadius: 2 }} item container>
                        <Grid item xs={1}>
                            <Avatar>H</Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography component="p">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Soluta, error blanditiis enim
                                pariatur illum nesciunt est minus sapiente
                                reiciendis. Minus a reprehenderit maiores
                                commodi velit laudantium labore ex nisi
                                temporibus?
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid sx={{ boxShadow: 1, borderRadius: 2 }} item container>
                        <Grid item xs={1}>
                            <Avatar>H</Avatar>
                        </Grid>
                        <Grid item xs>
                            <Typography component="p">
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Soluta, error blanditiis enim
                                pariatur illum nesciunt est minus sapiente
                                reiciendis. Minus a reprehenderit maiores
                                commodi velit laudantium labore ex nisi
                                temporibus?
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        id="filled-textarea"
                        label="Write your opinion"
                        placeholder="What do you think?"
                        rows={10}
                        multiline
                        sx={{ width: '100%' }}
                    />
                </Box>
            </Box>
        </PageWrapper>
    );
};

export default ProductInfoPage;
