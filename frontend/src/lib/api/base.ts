import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const API = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false, // set true only if using cookies and CORS
});

export default API;