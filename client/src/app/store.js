import { configureStore } from '@reduxjs/toolkit';

import productsReducer from '../features/productsSlice';
import filteringsSlice from '../features/filteringsSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        filterings: filteringsSlice,
    },
});
