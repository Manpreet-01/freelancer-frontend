import { cancelJobPayload } from "@/routes/(jobs)/job/$_id.lazy";
import { createJobSchema } from "@/routes/(jobs)/job/post/index.lazy";
import { LoginFormSchema } from "@/routes/login.lazy";
import axios from "axios";
import { z } from "zod";


export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
    timeout: 10000
});


apiClient.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalReq = error.config;

    // console.log('res err ;;;;;;;;;;;  ', error);

    // create a unique status code for message for retry logic so it dont interfare with other responses and errors
    // if (error.response?.status === 401) {
    //     try {
    //         await refreshTokens();
    //         return apiClient(originalReq);
    //     }
    //     catch (error) {
    //         return Promise.reject(error);
    //     }
    // }
    return Promise.reject(error);
});



// API functions for different actions

// methods related to user / auth
export const refreshTokens = () => {
    return apiClient.post("/user/refresh-tokens");
};

export const loginUser = (data: z.infer<typeof LoginFormSchema>) => {
    return apiClient.post("/user/login", data);
};

export const logOutUser = () => {
    return apiClient.get("/user/logout");
};

export const getProfile = () => {
    return apiClient.post("/user/profile");
};

export const getPublicProfile = (username: string) => {
    return apiClient.post(`/user/profile/${username}`);
};

// methods related to jobs
export const createJob = (jobData: z.infer<typeof createJobSchema>) => {
    return apiClient.post("/job/create", jobData);
};

export const getJobs = () => {
    return apiClient.get("/job/get-all");
};

export const updateJob = (data) => {
    return apiClient.put("/job/update", data);
};

export const cancelJob = (data: cancelJobPayload) => {
    return apiClient.delete("/job/cancel", { data });
};

export const getJobByid = (id: string) => {
    return apiClient.get(`/job/get?id=${id}`);
};

export const getClientJobs = () => {
    return apiClient.get(`/job/client/get-all`);
};

export const toggleJobIsSaved = (data: { userId: string, jobId: string; }) => {
    return apiClient.put(`/job/save/toggle`, data);
};

// methods related to proposals
// proposal methods for freelancers
export const submitProposal = (data: { jobId: string, coverLetter: string, }) => {
    return apiClient.post('/proposal/create', data);
};

export const updateProposal = (data: { jobId: string, coverLetter: string; }) => {
    return apiClient.post('/proposal/update', data);
};

// TODO: change delete logic to withdraw proposal
export const withdrawProposal = (data: { jobId: string; }) => {
    return apiClient.delete('/proposal/withdraw', { data });
};

// proposal methods for clients
export type AcceptOrRejectProposal = {
    proposalId: string,
    jobId: string,
    status: "accepted" | "rejected",
};

export const acceptOrRejectProposal = ({ jobId, proposalId, status }: AcceptOrRejectProposal) => {
    return apiClient.put(`/proposal/toggle-status/${proposalId}/?proposalStatus=${status}`, { jobId });
};