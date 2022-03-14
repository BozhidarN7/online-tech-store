import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { useAppSelector, useAppDispatch } from '../../app/hook';
import { productQauntityUpdated } from '../../features/usersSlice';
import { Product } from '../../interfaces/coreInterfaces';

type Props = {
    product: Product;
};

const ProductQuantity = ({ product }: Props) => {
    const dispatch = useAppDispatch();
    const productQuantity: any = useAppSelector((state) =>
        state.users.productsQuantity.find((pr: any) => pr._id === product._id)
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
