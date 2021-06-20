import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:5000',
})
export const axiosAuth = axios.create({
    baseURL: 'http://127.0.0.1:5000',
})

axiosAuth.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
})


