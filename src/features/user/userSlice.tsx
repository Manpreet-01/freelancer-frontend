import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    isLoggedIn: boolean;
}

const initialState: UserState = {
    isLoggedIn: true,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        logOutUser: (state) => {
            state.isLoggedIn = false;
        }
    },
});


export const { setIsLoggedIn, logOutUser } = userSlice.actions;
export default userSlice.reducer;