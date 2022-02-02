import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './contexts/AuthCtx';
import GlobalErrorBoundary from './errorBoundaries/GlobalErrorBoundary';
import AppRouter from './routes/AppRouter';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <GlobalErrorBoundary>
            <AuthProvider>
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
        </GlobalErrorBoundary>
    );
}

export default App;
