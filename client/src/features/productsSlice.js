import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsAdded(state, action) {
            state.products = action.payload.products;
        },
    },
});

export const { productsAdded } = productsSlice.actions;

export default productsSlice.reducer;
