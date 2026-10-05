import axios from "axios";




//server name (url)

const api =axios.create({
    baseURL: import.meta.env.VITE_API_URL
})


//send token
api.interceptors.request.use((config) => {
    const token=localStorage.getItem("token")

    if(token){
        config.headers.Authorization  = `Bearer ${token}`
    }
    return config
    
})
export default api;