import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import PageWrapper from '../wrappers/pageWrapper/PageWrapper';

const Spinner = () => {
    return (
        <PageWrapper>
            <Grid container justifyContent={'center'}>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </Grid>
        </PageWrapper>
    );
};

export default Spinner;
