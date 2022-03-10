import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Brand = {
    name: string;
    category: string;
    id: number;
};

type Price = {
    minPrice: number;
    maxPrice: number;
    value: number[];
};
export interface filteringsState {
    allCategories: string[];
    allBrands: Brand[];
    category: string;
    view: string;
    sorting: string;
    brands: string[];
    price: Price;
}

const initialState: filteringsState = {
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
            name: 'Mac',
            category: 'Laptops',
            id: 5,
        },
        {
            name: 'Drone',
            category: 'Drones',
            id: 6,
        },
        {
            name: 'AirPower',
            category: 'Drones',
            id: 7,
        },
        {
            name: 'AirSpeed',
            category: 'Drones',
            id: 8,
        },
        {
            name: 'LG',
            category: 'Monitors',
            id: 9,
        },
        {
            name: 'MSI',
            category: 'Monitors',
            id: 10,
        },
        {
            name: 'Asus',
            category: 'Monitors',
            id: 11,
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
        brandAdded(state, action: PayloadAction<string>) {
            state.brands.push(action.payload);
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
    priceValueChanged,
} = filteringsSlice.actions;

export default filteringsSlice.reducer;
