import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';

import isGuest from '../guards/isGuest';

import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import RegisterPage from '../pages/RegisterPage';
import ProductInfoPage from '../pages/ProductInfoPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={isGuest(LoginPage)} />
            <Route path="/register" element={isGuest(RegisterPage)} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductInfoPage />} />
        </Routes>
    );
};

export default AppRouter;
