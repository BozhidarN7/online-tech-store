import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';

import { priceValueChanged } from '../../../features/filteringsSlice';

const PriceRangeMenu = () => {
    const dispatch = useDispatch();

    const { minPrice, maxPrice, value } = useSelector(
        (state) => state.filterings.price
    );

    const valuetext = (value) => {
        return `${value}lv.`;
    };

    const handleChange = (event, newValue) => {
        dispatch(priceValueChanged({ newValue }));
    };

    return (
        <Box sx={{ width: 300 }}>
            <FormLabel>Price</FormLabel>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                step={100}
                min={minPrice}
                max={maxPrice}
            />
        </Box>
    );
};

export default PriceRangeMenu;
