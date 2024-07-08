export type Proposal = {
    _id: string;
    job: string;
    user?: {
        name: string,
        username: string,
        _id: string;
    },
    coverLetter: string;
    createdAt: string;
    updatedAt: string;
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
    proposals?: Proposal[];
    __v: number;
};

type JobItemApplied = JobItemBase & {
    isApplied: true;
    proposal: Proposal;
};

type JobItemNotApplied = JobItemBase & {
    isApplied: false;
    proposal?: undefined;
};

export type JobItem = JobItemApplied | JobItemNotApplied;