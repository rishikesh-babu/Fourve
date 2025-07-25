import { default as axios } from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`, 
    withCredentials: true
})

export default axiosInstance