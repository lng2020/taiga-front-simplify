import axios, {AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig} from 'axios';

const service: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    timeout: 5000
});

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // const token = localStorage.getItem('Authorization');
        // if (token) {
        // config.headers!.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        // const token= response.headers.Authorization;
        // if(token){
        //     localStorage.setItem('Authorization', token);
        // }
        if (response.status === 200) {
            return response;
        } else {
            Promise.reject();
        }
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
