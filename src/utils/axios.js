import axios from "axios";

// 创建 axios
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000
});

// 请求拦截 request
service.interceptors.request.use(
    config => {
        // 用户请求头
        // config.headers.token = "";
        // config.headers.userId = "";
        return config;
    },
    err => {
        Promise.reject(err);
    }
);

// 相应拦截 reponse
service.interceptors.response.use(
    response => {
        // 处理登录无效问题
        return response;
    },
    err => {
        return Promise.reject(err);
    }
);

export default service;
