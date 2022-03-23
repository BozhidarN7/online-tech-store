import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { sortingChanged, viewChanged } from '../../../features/filteringsSlice';

type Props = {
    type: 'sorting' | 'view';
};

const sortingOptions = {
    oldest: '',
    newest: 'Newest',
    lowest: 'Lowest price first',
    highest: 'Highest price first',
};
const viewOptions = [10, 25, 50, 100];

const SelectMenu = ({ type }: Props) => {
    const dispatch = useAppDispatch();
    const option = useAppSelector((state) => state.filterings[type]);

    const moreThan600 = useMediaQuery('(min-width:600px)');

    const [open, setOpen] = useState(false);

    const handleChange = (e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        type === 'sorting'
            ? dispatch(sortingChanged({ sorting: value }))
            : dispatch(viewChanged({ view: value }));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <Box>
            <FormControl
                sx={{
                    mt: moreThan600 ? 0 : 2,
                    mr: 1,
                    minWidth: { md: 200, sm: 170, xs: 170 },
                }}
            >
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
                                          <em>Oldest</em>
                                      </MenuItem>
                                  );
                              }
                              return (
                                  <MenuItem
                                      key={index}
                                      value={so.split(' ')[0].toLowerCase()}
                                  >
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
