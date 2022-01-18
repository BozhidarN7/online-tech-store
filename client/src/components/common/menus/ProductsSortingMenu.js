import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

import { changedSorting, changedView } from '../../../features/filteringsSlice.js';

const sortingOptions = {
    lowest: '',
    highest: 'Highest price first',
    newest: 'Newest',
    oldest: 'Oldest',
};
const viewOptions = [10, 25, 50, 100];

const SelectMenu = ({ type }) => {
    const dispatch = useDispatch();
    const option = useSelector((state) => state.filterings[type]);

    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        type === 'sorting'
            ? dispatch(changedSorting({ sorting: value }))
            : dispatch(changedView({ view: value }));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <Box>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-controlled-open-select-label">
                    {type === 'sorting' ? 'Sort' : 'View'}
                </InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={option}
                    label={type === 'sorting' ? 'Sort' : 'View'}
                    onChange={handleChange}
                >
                    {type === 'sorting'
                        ? Object.values(sortingOptions).map((so, index) => {
                              if (index === 0) {
                                  return (
                                      <MenuItem key={index} value="">
                                          <em>Lowest price first</em>
                                      </MenuItem>
                                  );
                              }
                              return (
                                  <MenuItem key={index} value={so.split(' ')[0].toLowerCase()}>
                                      {so}
                                  </MenuItem>
                              );
                          })
                        : viewOptions.map((vo, index) => {
                              if (index === 0) {
                                  return (
                                      <MenuItem key={index} value="">
                                          <em>{vo}</em>
                                      </MenuItem>
                                  );
                              }
                              return (
                                  <MenuItem key={index} value={vo}>
                                      {vo}
                                  </MenuItem>
                              );
                          })}
                </Select>
            </FormControl>
        </Box>
    );
};

const ProductsSortingMenu = () => {
    return (
        <>
            <SelectMenu type={'sorting'} />
            <SelectMenu type={'view'} />
        </>
    );
};

export default ProductsSortingMenu;
