import axios from "axios";

const axiosInstanace = axios.create({
    baseURL: import.meta.env.MODE === "devlopment" ? "http://localhost:2000/api" : "/api",
    // baseURL: "https://chat-app1-66hw.onrender.com/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export default axiosInstanace
