import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3001"
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            const accessToken = JSON.parse(token);
            if (accessToken) {
                if (config.headers) config.headers.token = accessToken;
            }

        }
        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);