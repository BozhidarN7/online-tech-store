import { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';

import { AuthProvider } from './contexts/AuthCtx';
import GlobalErrorBoundary from './errorBoundaries/GlobalErrorBoundary';
import AppRouter from './routes/AppRouter';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'light' : 'light',
                },
            }),
        [prefersDarkMode]
    );

    return (
        <GlobalErrorBoundary>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <CssBaseline />
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                    <AppRouter />
                </AuthProvider>
            </ThemeProvider>
        </GlobalErrorBoundary>
    );
}

export default App;
