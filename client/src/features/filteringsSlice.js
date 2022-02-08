import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allCategories: ['All', 'Laptops', 'Monitors', 'Drones'],
    allBrands: [
        {
            name: 'Lenovo',
            category: 'Laptops',
            id: 1,
        },
        {
            name: 'Acer',
            category: 'Laptops',
            id: 2,
        },
        {
            name: 'Dell',
            category: 'Laptops',
            id: 3,
        },
        {
            name: 'HP',
            category: 'Laptops',
            id: 4,
        },
        {
            name: 'Drone',
            category: 'Drones',
            id: 5,
        },
        {
            name: 'AirPower',
            category: 'Drones',
            id: 6,
        },
        {
            name: 'AirSpeed',
            category: 'Drones',
            id: 7,
        },
        {
            name: 'LG',
            category: 'Monitors',
            id: 8,
        },
        {
            name: 'MSI',
            category: 'Monitors',
            id: 9,
        },
        {
            name: 'Asus',
            category: 'Monitors',
            id: 10,
        },
    ],
    category: 'all',
    view: '',
    sorting: '',
    brands: [],
    price: {
        minPrice: 0,
        maxPrice: 10000,
        value: [0, 10000],
    },
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
            state.brands = state.brands.filter(
                (brand) => brand !== action.payload.brand
            );
        },
        viewChanged(state, action) {
            state.view = action.payload.view;
        },
        sortingChanged(state, action) {
            state.sorting = action.payload.sorting;
        },
        minMaxPriceChanged(state, action) {
            state.price.minPrice = action.payload.minPrice;
            state.price.maxPrice = action.payload.maxPrice;
        },
        priceValueChanged(state, action) {
            state.price.value = action.payload.newValue;
        },
    },
});

export const {
    categoryChanged,
    brandAdded,
    brandRemoved,
    viewChanged,
    sortingChanged,
    priceChanged,
    priceValueChanged,
} = filteringsSlice.actions;

export default filteringsSlice.reducer;
