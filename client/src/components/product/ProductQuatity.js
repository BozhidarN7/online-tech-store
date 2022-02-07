import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { productQauntityUpdated } from '../../features/usersSlice';

const ProductQuantity = ({ product }) => {
    const dispatch = useDispatch();
    const productQuantity = useSelector((state) =>
        state.users.productsQauntity.find((pr) => pr._id === product._id)
    );
    const quantity = productQuantity ? productQuantity.quantity : 1;

    const incrementQuantityHandler = () => {
        if (quantity === product.quantity) {
            return;
        }
        dispatch(
            productQauntityUpdated({
                productId: product._id,
                quantity: quantity + 1,
            })
        );
    };
    const decrementQuantityHandler = () => {
        if (quantity === 1) {
            return;
        }
        dispatch(
            productQauntityUpdated({
                productId: product._id,
                quantity: quantity - 1,
            })
        );
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography component="span">Quantity:</Typography>
            <IconButton onClick={decrementQuantityHandler} component="span">
                <RemoveCircleIcon />
            </IconButton>
            <Typography component="span">{quantity}</Typography>
            <IconButton onClick={incrementQuantityHandler} component="span">
                <AddCircleIcon />
            </IconButton>
        </Box>
    );
};

export default ProductQuantity;
