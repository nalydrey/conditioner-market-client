import axios from "axios";
console.log(process.env.REACT_APP_SERVER);
console.log(process.env.REACT_APP_PORT);

const instance = axios.create({
    baseURL: `http://${process.env.REACT_APP_SERVER}:${process.env.REACT_APP_PORT}/api`
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem('user')
    return config
})

export default instance