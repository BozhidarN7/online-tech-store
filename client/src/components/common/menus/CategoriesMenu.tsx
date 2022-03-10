import { useAppSelector, useAppDispatch } from '../../../app/hook';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

import { categoryChanged } from '../../../features/filteringsSlice';

const CategoriesMenu = () => {
    const dispatch = useAppDispatch();

    const allCategories = useAppSelector(
        (state) => state.filterings.allCategories
    );
    const selectedCategory = useAppSelector(
        (state) => state.filterings.category
    );

    const changeCategoryHandler = (e) => {
        dispatch(categoryChanged({ category: e.target.value }));
    };

    return (
        <FormControl sx={{ mb: 2 }} component="fieldset">
            <FormLabel component="legend">Category</FormLabel>
            <RadioGroup
                onChange={changeCategoryHandler}
                aria-label="category"
                value={selectedCategory}
                name="radio-buttons-group"
            >
                {allCategories.map((category, index) => (
                    <FormControlLabel
                        value={category.toLowerCase()}
                        control={<Radio />}
                        label={category}
                        key={index}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default CategoriesMenu;
