import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';

import { priceValueChanged } from '../../../features/filteringsSlice';

const PriceRangeMenu = () => {
    const dispatch = useAppDispatch();

    const { minPrice, maxPrice, value } = useAppSelector(
        (state) => state.filterings.price
    );

    const valuetext = (value: number) => {
        return `${value}lv.`;
    };

    const handleChange = (event: Event, newValue: number[] | number) => {
        dispatch(priceValueChanged({ newValue }));
    };

    return (
        <Box sx={{ width: { xl: 300, lg: 250, md: 180 } }}>
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
