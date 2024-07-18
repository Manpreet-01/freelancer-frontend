import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'
import jobReducer from '../features/job/jobSlice'
import proposalReducer from '../features/proposal/proposal'


export const store = configureStore({
    reducer: {
        user: userReducer,
        job: jobReducer,
        proposal: proposalReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;