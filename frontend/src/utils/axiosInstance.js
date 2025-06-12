import axios from 'axios'
import { BASE_URL } from './apiPaths'

export const axiosInstance = axios.create({
    baseURL : BASE_URL,
    withCredentials : true,
})