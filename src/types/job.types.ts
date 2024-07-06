export type Proposal = {
    _id: string;
    job: string;
    user?: {
        name: string,
        username: string,
        _id: string
    },
    coverLetter: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type JobItem = {
    _id: string;
    title: string;
    description: string;
    categories: string[];
    tags: string[];
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    isSaved: Boolean;
    proposal?: Proposal
    proposals?: Proposal[]
    __v: number;
};