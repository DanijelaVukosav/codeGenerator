import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

// @ts-ignore
export const http: AxiosInstance = axios.create({
    "baseURL": 'http://localhost:8080', // Zamijenite s vašom URL adresom
    // "headers": {
    //     'Content-Type': 'multipart/form-data',
    // },
});