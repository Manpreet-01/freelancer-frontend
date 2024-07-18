import { Proposal } from "@/types/job.types";
import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";


type ProposalState = {
    proposal: Proposal | null,
    proposals: Proposal[],
};

const initialState: ProposalState = {
    proposal: null,
    proposals: [],
};


const proposalSlice = createSlice({
    name: "proposal",
    initialState,
    reducers: {
        setProposals: (state, action: PayloadAction<Proposal[]>) => {
            state.proposals = action.payload;
        }
    }
});



export const { setProposals } = proposalSlice.actions;
export default proposalSlice.reducer as Reducer<ProposalState>;