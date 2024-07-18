export type Proposal = {
    _id: string;
    job: string;
    user?: {                // sometimer there is no need to display user's Info into UI, so it can be absent
        name: string,
        username: string,
        isAvailableNow?: boolean,
        _id: string;
    },
    coverLetter: string;
    createdAt: string;
    updatedAt: string;
    isWithdrawn: boolean;
    status?: 'unread' | 'pending' | 'accepted' | 'rejected';
    __v: number;
};

export type JobItemBase = {
    _id: string;
    title: string;
    description: string;
    categories: string[];
    tags: string[];
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    isSaved: Boolean;
    cancelled: Boolean;
    proposals?: Proposal[];
    proposalsCount: number;
    __v: number;
};

type JobItemApplied = JobItemBase & {
    isApplied: true;                // showing status on jobs list page based on these booleans
    isWithdrawn?: true;
    proposal: Proposal;
};

type JobItemNotApplied = JobItemBase & {
    isApplied: undefined;
    isWithdrawn: undefined;
    proposal: undefined;
};

export type JobItem = JobItemApplied | JobItemNotApplied;