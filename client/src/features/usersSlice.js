import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    productsQauntity: [],
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

            const product = state.productsQauntity.find(
                (product) => product._id === productId
            );

            if (product) {
                product.quantity = quantity;
            } else {
                state.productsQauntity.push({ _id: productId, quantity });
            }
        },
    },
});

export const { currentUserAdded, currentUserLogout, productQauntityUpdated } =
    usersSlice.actions;

export const selectCurrentUser = (state) => state.users.currentUser;

export default usersSlice.reducer;
