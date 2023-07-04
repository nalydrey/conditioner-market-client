import axios from "../../../utils/axios";
import {showMessage} from "../../../store/actionCreators/actionCreatorSnack";

const route = 'favorites'
export const changeFavoriteOS = async (productId) => {
    const {data} = await axios.put(`/${route}/${productId}`)
    showMessage(data.message, data.typeMessage)
    return data.isAdd
}

export const getMyFavoritesFS = async () => {
    const {data} = await axios.get(`/${route}/me`)
    console.log(data)
    showMessage(data.message, data.typeMessage)
    return data.favorites
}
export const getAllFavoritesFS = async (limit, page) => {
    const {data} = await axios.get(`/${route}?_limit=${limit}&_page=${page}`)
    showMessage(data.message, data.typeMessage)
    return [data.products, data.total]
}