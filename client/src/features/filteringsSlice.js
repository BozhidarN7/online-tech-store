import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    category: 'all',
    view: '',
    sorting: '',
    brands: [],
    price: [],
};

const filteringsSlice = createSlice({
    name: 'filterings',
    initialState,
    reducers: {
        categoryChanged(state, action) {
            state.category = action.payload.category;
        },
        brandAdded(state, action) {
            state.brands.push(action.payload.brand);
        },
        brandRemoved(state, action) {
            state.brands = state.brands.filter((brand) => brand !== action.payload.brand);
        },
        viewChanged(state, action) {
            state.view = action.payload.view;
        },
        sortingChanged(state, action) {
            state.sorting = action.payload.sorting;
        },
    },
});

export const { categoryChanged, brandAdded, brandRemoved, viewChanged, sortingChanged } =
    filteringsSlice.actions;

export default filteringsSlice.reducer;
