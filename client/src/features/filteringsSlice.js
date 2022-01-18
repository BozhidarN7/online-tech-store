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
        changedCategory(state, action) {
            state.category = action.payload.category;
        },
        addedBrand(state, action) {
            state.brands.push(action.payload.brand);
        },
        removedBrand(state, action) {
            state.brands = state.brands.filter((brand) => brand !== action.payload.brand);
        },
        changedView(state, action) {
            state.view = action.payload.view;
        },
        changedSorting(state, action) {
            state.sorting = action.payload.sorting;
        },
    },
});

export const { changedCategory, addedBrand, removedBrand, changedView, changedSorting } =
    filteringsSlice.actions;

export default filteringsSlice.reducer;
