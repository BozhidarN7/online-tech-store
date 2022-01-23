import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
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
    },
});

export const { currentUserAdded, currentUserLogout } = usersSlice.actions;

export const selectCurrentUser = (state) => state.users.currentUser;

export default usersSlice.reducer;
