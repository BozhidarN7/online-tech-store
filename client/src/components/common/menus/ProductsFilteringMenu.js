import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

import { changedCategory, addedBrand, removedBrand } from '../../../features/filteringsSlice';

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
    const dispatch = useDispatch();

    const category = useSelector((state) => state.filterings.category);
    const brands = useSelector((state) => state.filterings.brands);

    const changeCategoryHandler = (e) => {
        dispatch(changedCategory({ category: e.target.value }));
    };

    const toggleBrandHandler = (e) => {
        const brand = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            dispatch(addedBrand({ brand }));
        } else {
            dispatch(removedBrand({ brand }));
        }
    };

    return (
        <Box>
            <Typography sx={{ mb: 2 }} variant="h5" component="div">
                Options menu
            </Typography>

            <FormControl sx={{ mb: 2 }} component="fieldset">
                <FormLabel component="legend">Category</FormLabel>
                <RadioGroup
                    onChange={changeCategoryHandler}
                    aria-label="category"
                    value={category}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                    <FormControlLabel value="laptops" control={<Radio />} label="Laptops" />
                    <FormControlLabel value="monitors" control={<Radio />} label="Monitors" />
                    <FormControlLabel value="drones" control={<Radio />} label="Drones" />
                </RadioGroup>
            </FormControl>

            <FormGroup sx={{ mb: 2 }}>
                <FormLabel component="legend">Brand</FormLabel>
                <FormControlLabel
                    checked={brands.find((brand) => brand === 'lenovo') ? true : false}
                    onChange={toggleBrandHandler}
                    control={<Checkbox />}
                    label="Lenovo"
                    value="lenovo"
                />
                <FormControlLabel
                    checked={brands.find((brand) => brand === 'acer') ? true : false}
                    onChange={toggleBrandHandler}
                    control={<Checkbox />}
                    label="Acer"
                    value="acer"
                />
                <FormControlLabel
                    checked={brands.find((brand) => brand === 'dell') ? true : false}
                    onChange={toggleBrandHandler}
                    control={<Checkbox />}
                    label="Dell"
                    value="dell"
                />
            </FormGroup>

            <RangeSlider />
        </Box>
    );
};

export default ProductsFilteringMenu;
