import { useSelector, useDispatch } from 'react-redux';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

import { categoryChanged } from '../../../features/filteringsSlice';

const ProductsMenu = () => {
    const dispatch = useDispatch();

    const category = useSelector((state) => state.filterings.category);

    const changeCategoryHandler = (e) => {
        dispatch(categoryChanged({ category: e.target.value }));
    };

    return (
        <FormControl sx={{ mb: 2 }} component="fieldset">
            <FormLabel component="legend">Category</FormLabel>
            <RadioGroup
                onChange={changeCategoryHandler}
                aria-label="category"
                value={category}
                name="radio-buttons-group"
            >
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel
                    value="laptops"
                    control={<Radio />}
                    label="Laptops"
                />
                <FormControlLabel
                    value="monitors"
                    control={<Radio />}
                    label="Monitors"
                />
                <FormControlLabel
                    value="drones"
                    control={<Radio />}
                    label="Drones"
                />
            </RadioGroup>
        </FormControl>
    );
};

export default ProductsMenu;
