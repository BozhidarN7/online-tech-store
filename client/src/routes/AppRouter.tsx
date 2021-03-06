import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';

import isGuest from '../guards/isGuest';
import isLogged from '../guards/isLogged';

import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import RegisterPage from '../pages/RegisterPage';
import ProductInfoPage from '../pages/ProductInfoPage';
import CartPage from '../pages/CartPage';
import FavoritesPage from '../pages/FavoritesPage';
import PaymentPage from '../pages/PaymentPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={isGuest(LoginPage)} />
            <Route path="/register" element={isGuest(RegisterPage)} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductInfoPage />} />
            <Route path="/cart" element={isLogged(CartPage)} />
            <Route path="/favorites" element={isLogged(FavoritesPage)} />
            <Route path="/payment" element={isLogged(PaymentPage)} />
        </Routes>
    );
};

export default AppRouter;
