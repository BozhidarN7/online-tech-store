import Box from '@mui/material/Box';

import NavBar from '../../common/navBar/NavBar';
import Footer from '../../common/Footer';

const PageWrapper = ({ children }) => {
    return (
        <>
            <NavBar />
            <Box sx={{ mx: { xl: 3, lg: 3 }, my: 10 }}>{children}</Box>
            <Footer />
        </>
    );
};

export default PageWrapper;
