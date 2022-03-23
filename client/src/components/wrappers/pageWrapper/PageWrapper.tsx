import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import NavBar from '../../common/navBar/NavBar';
import Footer from '../../common/Footer';

type Props = {
    children: React.ReactNode;
};

const PageWrapper = ({ children }: Props) => {
    return (
        <>
            <NavBar />
            <Container maxWidth="xl">
                <Box sx={{ my: 10 }}>{children}</Box>
            </Container>
            <Footer />
        </>
    );
};

export default PageWrapper;
