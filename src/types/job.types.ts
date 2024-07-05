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
    __v: number;
};