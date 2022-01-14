import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import PageWrapper from '../../components/wrappers/pageWrapper/PageWrapper';
import ProductCard from '../../components/product/ProductCard';
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

function ControlledOpenSelect() {
    const [age, setAge] = useState('');
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Button sx={{ display: 'block', mt: 2 }} onClick={handleOpen}>
                Open the select
            </Button>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

const ProductsPage = () => {
    return (
        <PageWrapper>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Box>
                        <Typography sx={{ mb: 2 }} variant="h5" component="div">
                            Options menu
                        </Typography>

                        <FormControl sx={{ mb: 2 }} component="fieldset">
                            <FormLabel component="legend">Category</FormLabel>
                            <RadioGroup
                                aria-label="category"
                                defaultValue="laptops"
                                name="radio-buttons-group"
                            >
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
                </Grid>
                <Grid container item xs={9} rowSpacing={10}>
                    <Grid container item xs={12}>
                        <ControlledOpenSelect />
                        <ControlledOpenSelect />
                    </Grid>
                    <Grid item xs={4}>
                        <ProductCard />
                    </Grid>
                    <Grid item xs={4}>
                        <ProductCard />
                    </Grid>
                    <Grid item xs={4}>
                        <ProductCard />
                    </Grid>
                    <Grid item xs={4}>
                        <ProductCard />
                    </Grid>
                    <Grid item xs={4}>
                        <ProductCard />
                    </Grid>
                    <Grid item xs={4}>
                        <ProductCard />
                    </Grid>
                    <Grid item xs={4}>
                        <ProductCard />
                    </Grid>
                </Grid>
            </Grid>
        </PageWrapper>
    );
};

export default ProductsPage;
