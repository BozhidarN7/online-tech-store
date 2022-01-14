import { useState } from 'react';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

const sortingOptions = ['Lowest price first', 'Highest price first', 'Newest', 'Oldest'];
const viewOptions = [10, 25, 50, 100];

const SelectMenu = ({ type }) => {
    const [option, setOption] = useState('');
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setOption(event.target.value);
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
                        ? sortingOptions.map((so, index) => {
                              if (index === 0) {
                                  return (
                                      <MenuItem value="">
                                          <em>{so}</em>
                                      </MenuItem>
                                  );
                              }
                              return <MenuItem value={so.split(' ')[0].toLowerCase()}>{so}</MenuItem>;
                          })
                        : viewOptions.map((vo, index) => {
                              if (index === 0) {
                                  return (
                                      <MenuItem value="">
                                          <em>{vo}</em>
                                      </MenuItem>
                                  );
                              }
                              return <MenuItem value={vo}>{vo}</MenuItem>;
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
