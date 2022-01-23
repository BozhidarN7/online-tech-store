import { configureStore } from '@reduxjs/toolkit';

import productsReducer from '../features/productsSlice';
import filteringsReducer from '../features/filteringsSlice';
import usersReducer from '../features/usersSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        filterings: filteringsReducer,
        users: usersReducer,
    },
});
