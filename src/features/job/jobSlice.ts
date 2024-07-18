import { JobItem } from "@/types/job.types";
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, Reducer } from '@reduxjs/toolkit';

// type JobItem2 = {
//     _id: string;
//     title: string;
//     description: string;
//     categories: string[];
//     tags: string[];
//     createdBy: string;
//     createdAt: string;
//     updatedAt: string;
//     proposalsCount: number;
// };


type JobSliceState = {
    jobs: JobItem[];
};

const initialState: JobSliceState = {
    jobs: [],
};

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        setJobs: (state, action: PayloadAction<JobItem[]>) => {
            state.jobs = action.payload;
        },
        postNewJob: (state, action: PayloadAction<JobItem>) => {
            const newJob = action.payload;
            state.jobs = [newJob, ...state.jobs]; // inserted at first position
        },
        updateJob: (state, action: PayloadAction<JobItem>) => {
            const updatedJob = action.payload;
            state.jobs = state.jobs.map(job => job._id === updatedJob._id ? updatedJob : job);
        },
        deleteJob: (state, action: PayloadAction<JobItem["_id"]>) => {
            const _id = action.payload;
            state.jobs = state.jobs.filter(job => job._id !== _id);
        },
        toggleIsSaved: (state, action: PayloadAction<{ isSaved: boolean, jobId: string; }>) => {
            const { isSaved, jobId } = action.payload;
            state.jobs = state.jobs.map(job => job._id === jobId ? { ...job, isSaved } : job);
        },
        resetJobSliceState: (state) => {
            state.jobs = [];
        },
    },
});


export const { setJobs, postNewJob, updateJob, deleteJob, toggleIsSaved,resetJobSliceState } = jobSlice.actions;
export default jobSlice.reducer as Reducer<JobSliceState>;