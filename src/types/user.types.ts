// TODO: rename this to UserData
export type userData = {
    _id: string;
    name: string;
    username: string;
    email?: string;
    role: string;
    imgUrl?: string;
    createdAt: string;
    updatedAt: string;
    appliedJobs: string[];
    savedJobs: string[];
    isAvailableNow: boolean;
};