import { useState } from 'react';

import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const MoreFilteringOptionsMenu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const showMoreFilteringOptionsHandler = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Box>
            {!isOpen ? (
                <Typography
                    sx={{ cursor: 'pointer' }}
                    variant="body1"
                    component="span"
                    onClick={showMoreFilteringOptionsHandler}
                >
                    Show more
                </Typography>
            ) : null}

            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                {children}
                <Typography
                    sx={{ cursor: 'pointer', display: 'block' }}
                    variant="body1"
                    component="span"
                    onClick={showMoreFilteringOptionsHandler}
                >
                    Show less
                </Typography>
            </Collapse>
        </Box>
    );
};

export default MoreFilteringOptionsMenu;
