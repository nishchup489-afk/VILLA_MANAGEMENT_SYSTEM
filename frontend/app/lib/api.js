import axios from "axios";

const api = axios.create({
    baseURL : "https://villa-management-system-bi3y.onrender.com" , 
    headers : {
        "Content-Type" : "application/json"
    }
});

export default api 