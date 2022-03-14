import { useTheme } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import DoneIcon from '@mui/icons-material/Done';

import ProductQauntity from './ProductQuatity';

type Props = {
    page: string;
};

const ProductSummary = ({ product, page }: any) => {
    const theme = useTheme();
    return (
        <>
            <Typography sx={{ mb: 2 }} variant="h6" component="div">
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
                <Rating name="read-only" value={product.rating} readOnly />
            </Box>
            {page === 'cart' || page === 'productInfo' ? (
                <ProductQauntity product={product} />
            ) : null}
        </>
    );
};

export default ProductSummary;
