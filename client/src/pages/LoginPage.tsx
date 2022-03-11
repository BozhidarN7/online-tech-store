import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import UserAccountForm from '../components/common/navBar/forms/UserAccountForm';

const theme = createTheme();

const LoginPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            'url(https://hobbyquotidiano.com/wp-content/uploads/2019/09/Drone-featured.jpg)', // use this in the furture https://source.unsplash.com/random
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <UserAccountForm formType={'login'} />
            </Grid>
        </ThemeProvider>
    );
};

export default LoginPage;
