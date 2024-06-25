import { userData } from '@/types/user.types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, Reducer } from '@reduxjs/toolkit';

export type UserState = {
    userData: userData | null,
    isLoggedIn: boolean;
}

const initialState: UserState = {
    userData: null,
    isLoggedIn: true,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoggedInUser: (state, action: PayloadAction<userData>) => {
            state.userData = action.payload
            state.isLoggedIn = true;
        },
        logOutUser: (state) => {
            state.userData = null;
            state.isLoggedIn = false;
        }
    },
});


export const { setLoggedInUser, logOutUser } = userSlice.actions;
export default userSlice.reducer as Reducer<UserState>;