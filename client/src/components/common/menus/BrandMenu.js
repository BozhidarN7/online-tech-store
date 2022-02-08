import { useSelector, useDispatch } from 'react-redux';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';

import { brandAdded, brandRemoved } from '../../../features/filteringsSlice';
import MoreFilteringOptionsMenu from './MoreFilteringOptionsMenu';

const BrandMenu = () => {
    const dispatch = useDispatch();

    const allBrands = useSelector((state) => state.filterings.allBrands);
    const selectedBrands = useSelector((state) => state.filterings.brands);

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
        <FormGroup onChange={toggleBrandHandler} sx={{ mb: 2 }}>
            <FormLabel component="legend">Brand</FormLabel>
            {allBrands.slice(0, 3).map((brand) => (
                <FormControlLabel
                    control={<Checkbox />}
                    label={brand.name}
                    value={brand.name.toLowerCase()}
                    key={brand.id}
                    checked={
                        selectedBrands.find(
                            (selectedBrand) =>
                                selectedBrand === brand.name.toLowerCase()
                        )
                            ? true
                            : false
                    }
                />
            ))}

            <MoreFilteringOptionsMenu>
                {allBrands.slice(3).map((brand) => (
                    <FormControlLabel
                        sx={{ display: 'block' }}
                        control={<Checkbox />}
                        label={brand.name}
                        value={brand.name.toLowerCase()}
                        key={brand.id}
                        checked={
                            selectedBrands.find(
                                (selectedBrand) =>
                                    selectedBrand === brand.name.toLowerCase()
                            )
                                ? true
                                : false
                        }
                    />
                ))}
            </MoreFilteringOptionsMenu>
        </FormGroup>
    );
};

export default BrandMenu;
