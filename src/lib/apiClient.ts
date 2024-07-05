import { deleteJobPayload } from "@/routes/(jobs)/job/$_id.lazy";
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

export const createJob = (jobData: z.infer<typeof createJobSchema>) => {
    return apiClient.post("/job/create", jobData);
};

export const getJobs = () => {
    return apiClient.get("/job/get-all");
};

export const updateJob = (data) => {
    return apiClient.put("/job/update", data);
};

export const deleteJob = (data: deleteJobPayload) => {
    return apiClient.delete("/job/delete", { data });
};

export const getJobsById = (id: string) => {
    return apiClient.get(`/job/get?id=${id}`);
};

export const getClientJobs = (id: string) => {
    return apiClient.get(`/job/client/get-all?id=${id}`);
};

export const toggleJobIsSaved = (data: { userId: string, jobId: string }) => {
    return apiClient.put(`/job/save/toggle`, data);
};