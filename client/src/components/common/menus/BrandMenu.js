import { useSelector, useDispatch } from 'react-redux';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';

import { brandAdded, brandRemoved } from '../../../features/filteringsSlice';

const BrandMenu = () => {
    const dispatch = useDispatch();

    const brands = useSelector((state) => state.filterings.brands);

    const toggleBrandHandler = (e) => {
        const brand = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            dispatch(brandAdded({ brand }));
        } else {
            dispatch(brandRemoved({ brand }));
        }
    };

    return (
        <FormGroup sx={{ mb: 2 }}>
            <FormLabel component="legend">Brand</FormLabel>
            <FormControlLabel
                checked={
                    brands.find((brand) => brand === 'lenovo') ? true : false
                }
                onChange={toggleBrandHandler}
                control={<Checkbox />}
                label="Lenovo"
                value="lenovo"
            />
            <FormControlLabel
                checked={
                    brands.find((brand) => brand === 'acer') ? true : false
                }
                onChange={toggleBrandHandler}
                control={<Checkbox />}
                label="Acer"
                value="acer"
            />
            <FormControlLabel
                checked={
                    brands.find((brand) => brand === 'dell') ? true : false
                }
                onChange={toggleBrandHandler}
                control={<Checkbox />}
                label="Dell"
                value="dell"
            />
        </FormGroup>
    );
};

export default BrandMenu;
