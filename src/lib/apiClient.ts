import { LoginFormSchema } from "@/routes/login.lazy";
import axios from "axios";
import { z } from "zod";


export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
});


// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use(
    function (config) {
        // Retrieve user token from local storage
        const token = localStorage.getItem("token");
        // Set authorization header with bearer token
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);


// API functions for different actions
export const loginUser = (data: z.infer<typeof LoginFormSchema>) => {
    return apiClient.post("/user/login", data);
};

export const logoutUser = () => {
    return apiClient.get("/user/logout");
};

export const getProfile = () => {
    return apiClient.post("/user/profile");
};