import axios from "../../../utils/axios";
import {showMessage} from "../../../store/actionCreators/actionCreatorSnack";

const route = 'users'
export const getAllUsersFS = async (limit, page) => {
    const {data} = await axios.get(`/${route}?_limit=${limit}&_page=${page}`)
    showMessage(data.message, data.typeMessage)
    console.log(data)
    return [data.users, data.total]
}
export const deleteUserFS = async (id) => {
    const {data} = await axios.delete(`/${route}/${id}`)
    showMessage(data.message, data.typeMessage)
    return data.typeMessage === 'success' ? true : false
}
export const changeAvatarOS = async (image) => {
    const {data} = await axios.put(`/${route}/me/avatar`, image)
    showMessage(data.message, data.typeMessage)
    return data.user
}

