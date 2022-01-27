import Box from '@mui/material/Box';

import NavBar from '../../common/navBar/NavBar.js';

const PageWrapper = ({ children }) => {
    return (
        <>
            <NavBar />
            <Box sx={{ mx: { xl: 3, lg: 3 }, mt: 10 }}>{children}</Box>
        </>
    );
};

export default PageWrapper;
