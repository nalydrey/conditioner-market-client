import axios from "../../../utils/axios";
import {showMessage} from "../../../store/actionCreators/actionCreatorSnack";

const route = 'auth'
export const registerUserOS = async (userData) => {
    const {data} = await axios.post(`/${route}/register`, userData)
    showMessage( data.message,data.typeMessage)
    return [data.newUser, data.token]
}
export const loginUserOS = async (userData) => {
    const {data} = await axios.post(`/${route}/login`, userData)
    showMessage( data.message,data.typeMessage)
    console.log(data)
    return [data.user, data.token]
}
export const authMeFS = async () => {
    const {data} = await axios.get(`/${route}/me`)
    showMessage( data.message,data.typeMessage)
    console.log(data)
    return [data.user, data.token]
}