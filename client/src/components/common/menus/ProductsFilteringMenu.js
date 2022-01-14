import { useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const valuetext = (value) => {
    return `${value}lv.`;
};

const RangeSlider = () => {
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

const ProductsFilteringMenu = () => {
    return (
        <Box>
            <Typography sx={{ mb: 2 }} variant="h5" component="div">
                Options menu
            </Typography>

            <FormControl sx={{ mb: 2 }} component="fieldset">
                <FormLabel component="legend">Category</FormLabel>
                <RadioGroup aria-label="category" defaultValue="laptops" name="radio-buttons-group">
                    <FormControlLabel value="Laptops" control={<Radio />} label="Laptops" />
                    <FormControlLabel value="Monitors" control={<Radio />} label="Monitors" />
                    <FormControlLabel value="drones" control={<Radio />} label="Drones" />
                </RadioGroup>
            </FormControl>

            <FormGroup sx={{ mb: 2 }}>
                <FormLabel component="legend">Brand</FormLabel>
                <FormControlLabel control={<Checkbox />} label="Lenovo" />
                <FormControlLabel control={<Checkbox />} label="Acer" />
                <FormControlLabel control={<Checkbox />} label="Dell" />
            </FormGroup>

            <RangeSlider />
        </Box>
    );
};

export default ProductsFilteringMenu;
