import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import DoneIcon from '@mui/icons-material/Done';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import ShopIcon from '@mui/icons-material/Shop';

import PageWrapper from '../components/wrappers/pageWrapper/PageWrapper';
import Image from 'mui-image';

const CartPage = () => {
    return (
        <PageWrapper>
            <Grid container>
                <Grid sx={{ bgcolor: 'lightblue', p: 2, mr: 2 }} item xs={8}>
                    <Typography sx={{ mb: 2 }} variant="h4" component="h1">
                        Shopping Cart
                    </Typography>
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
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Tempore alias eaque, amet
                                    commodi illo eius optio explicabo voluptate
                                    harum odit enim numquam nulla est, quisquam
                                    sunt dolorum sit dicta iste.
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography
                                    sx={{ mb: 2 }}
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
                                    <Rating
                                        name="read-only"
                                        value={2}
                                        readOnly
                                    />
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <Typography component="span">
                                        Quantity:
                                    </Typography>
                                    <IconButton component="span">
                                        <RemoveCircleIcon />
                                    </IconButton>
                                    <Typography component="span">1</Typography>
                                    <IconButton component="span">
                                        <AddCircleIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography
                                    sx={{ display: 'block', mb: 2 }}
                                    variant="h5"
                                    component="span"
                                >
                                    1222 lv.
                                </Typography>
                                <Button
                                    variant="text"
                                    startIcon={<FavoriteIcon />}
                                >
                                    Add to favorites
                                </Button>
                                <Button
                                    variant="text"
                                    startIcon={<DeleteIcon />}
                                >
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid sx={{ bgcolor: 'white', p: 2 }} item container>
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
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Tempore alias eaque, amet
                                    commodi illo eius optio explicabo voluptate
                                    harum odit enim numquam nulla est, quisquam
                                    sunt dolorum sit dicta iste.
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography
                                    sx={{ mb: 2 }}
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
                                    <Rating
                                        name="read-only"
                                        value={2}
                                        readOnly
                                    />
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <Typography component="span">
                                        Quantity:
                                    </Typography>
                                    <IconButton component="span">
                                        <RemoveCircleIcon />
                                    </IconButton>
                                    <Typography component="span">1</Typography>
                                    <IconButton component="span">
                                        <AddCircleIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography
                                    sx={{ display: 'block', mb: 2 }}
                                    variant="h5"
                                    component="span"
                                >
                                    1222 lv.
                                </Typography>
                                <Button
                                    variant="text"
                                    startIcon={<FavoriteIcon />}
                                >
                                    Add to favorites
                                </Button>
                                <Button
                                    variant="text"
                                    startIcon={<DeleteIcon />}
                                >
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    sx={{
                        boxShadow: 3,
                        borderRadius: 3,
                        minHeight: 350,
                        maxHeight: 350,
                        ml: 2,
                    }}
                    item
                    xs={3}
                >
                    <Typography sx={{ m: 2 }} variant="h5" component="h2">
                        Information about the order
                    </Typography>
                    <Box sx={{ borderBottom: 1, p: 2, textAlign: 'center' }}>
                        <Typography variant="h6" component="p">
                            Total:
                        </Typography>
                        <Typography variant="h6" component="p">
                            1550 lv.
                        </Typography>
                        <Button
                            sx={{ width: 182 }}
                            variant="contained"
                            startIcon={<ShopIcon />}
                        >
                            Continue
                        </Button>
                    </Box>
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                        <Typography>Add promo code</Typography>
                        <TextField
                            id="standard-basic"
                            label="Promo code"
                            variant="standard"
                        />
                        <Button sx={{ width: 182, mt: 1 }} variant="outlined">
                            Add code
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </PageWrapper>
    );
};

export default CartPage;
