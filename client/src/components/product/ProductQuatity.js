import { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const ProductQuantity = ({ product }) => {
    const [quantity, setQuantiy] = useState(1);

    const incrementQuantityHandler = () => {
        if (quantity === product.quantity) {
            return;
        }

        setQuantiy((prev) => prev + 1);
    };
    const decrementQuantityHandler = () => {
        if (quantity === 1) {
            return;
        }

        setQuantiy((prev) => prev - 1);
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
