import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

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

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
