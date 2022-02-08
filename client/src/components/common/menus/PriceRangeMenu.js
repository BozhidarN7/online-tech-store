import { useState } from 'react';

import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';

const PriceRangeMenu = () => {
    const valuetext = (value) => {
        return `${value}lv.`;
    };

    const [value, setValue] = useState([0, 1000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                min={0}
                max={1000}
            />
        </Box>
    );
};

export default PriceRangeMenu;
