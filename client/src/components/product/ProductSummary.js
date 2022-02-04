import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import DoneIcon from '@mui/icons-material/Done';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const ProductSummary = ({ product, page }) => {
    return (
        <>
            <Typography sx={{ mb: 2 }} variant="h6" component="div">
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
                <Rating name="read-only" value={product.rating} readOnly />
            </Box>
            {page === 'cart' || page === 'productInfo' ? (
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
            ) : null}
        </>
    );
};

export default ProductSummary;
