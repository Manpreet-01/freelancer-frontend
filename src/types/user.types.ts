import { JobItem } from "@/types/job.types";

export type UserData = {
    _id: string;
    name: string;
    username: string;
    email?: string;
    role: string;
    imgUrl?: string;
    createdAt: string;
    updatedAt: string;
    appliedJobs: string[] | JobItem[];
    savedJobs: string[];
    isAvailableNow: boolean;
};