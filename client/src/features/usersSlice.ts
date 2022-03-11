import { createSlice } from '@reduxjs/toolkit';

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
        productQauntityUpdated(state, action) {
            const productId = action.payload.productId;
            const quantity = action.payload.quantity;

            const product = state.productsQuantity.find(
                (product: any) => product._id === productId
            );

            if (product) {
                product.quantity = quantity;
            } else {
                state.productsQuantity.push({ _id: productId, quantity });
            }
        },
    },
});

export const { currentUserAdded, currentUserLogout, productQauntityUpdated } =
    usersSlice.actions;

export const selectCurrentUser = (state: any) => state.users.currentUser;

export default usersSlice.reducer;
