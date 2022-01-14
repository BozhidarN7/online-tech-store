import Box from '@mui/material/Box';

import NavBar from '../../common/navBar/NavBar.js';

const PageWrapper = ({ children }) => {
    return (
        <>
            <NavBar />
            <Box sx={{ mr: 27, ml: 27, mt: 10 }}>{children}</Box>
        </>
    );
};

export default PageWrapper;
