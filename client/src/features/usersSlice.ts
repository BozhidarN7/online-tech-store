import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../interfaces/coreInterfaces';

export interface UsersState {
    currentUser: any;
    productsQuantity: any;
}

const initialState: UsersState = {
    currentUser: null,
    productsQuantity: [],
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        currentUserAdded(state, action) {
            state.currentUser = action.payload;
        },
        currentUserLogout(state, action) {
            state.currentUser = {};
        },
        productsQuantityAdd(state, action) {
            const productId = action.payload.productId;
            const quantity = action.payload.quantity;

            const product = state.productsQuantity.find(
                (product: Product) => product._id === productId
            );

            if (product) {
                product.quantity = quantity;
            } else {
                state.productsQuantity.push({ _id: productId, quantity });
            }
        },
        productsQuantityRemove(state, action) {
            state.productsQuantity = [];
        },
    },
});

export const {
    currentUserAdded,
    currentUserLogout,
    productsQuantityAdd,
    productsQuantityRemove,
} = usersSlice.actions;

export const selectCurrentUser = (state: any) => state.users.currentUser;

export default usersSlice.reducer;
