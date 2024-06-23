import { LoginFormSchema } from "@/routes/login.lazy";
import axios from "axios";
import { z } from "zod";


export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
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

    console.log('res err ;;;;;;;;;;;  ', error);

    if (error.response.status === 401) {
        try {
            await refreshToken();
            return apiClient(originalReq);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
});



// API functions for different actions
export const refreshToken = () => {
    return apiClient.post("/user/refresh-tokens");
};

export const loginUser = (data: z.infer<typeof LoginFormSchema>) => {
    return apiClient.post("/user/login", data);
};

export const logoutUser = () => {
    return apiClient.get("/user/logout");
};

export const getProfile = () => {
    return apiClient.post("/user/profile");
};