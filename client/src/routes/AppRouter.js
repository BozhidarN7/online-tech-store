import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage/HomePage';

import isGuest from '../guards/isGuest';

import LoginPage from '../pages/loginPage/LoginPage';
import ProductsPage from '../pages/productsPage/ProductsPage';
import RegisterPage from '../pages/registerPage/RegisterPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={isGuest(LoginPage)} />
            <Route path="/register" element={isGuest(RegisterPage)} />
            <Route path="/products" element={<ProductsPage />} />
        </Routes>
    );
};

export default AppRouter;
