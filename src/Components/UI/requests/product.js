import axios from "../../../utils/axios";
import {showMessage} from "../../../store/actionCreators/actionCreatorSnack";


const route = 'products'

export const createProduct = async (payload) => {
    const {data} = await axios.post(`/${route}`, payload)
    showMessage(data.message, data.typeMessage)
    return data.product
}

export const editProductById = async (ProductId, editedProduct) => {
    const {data} = await axios.put(`/${route}/${ProductId}`, editedProduct)
    showMessage(data.message, data.typeMessage)
}
export const deleteProductById = async (ProductId) => {
    const { data } = await axios.delete(`/${route}/${ProductId}`)
    showMessage(data.message ,data.typeMessage)
    return data.typeMessage==='success' ? true : false
}

export const getProductById = async (ProductId) => {
    const {data} = await axios.get(`/${route}/${ProductId}`)
    return data.product
}

export const createProductImages = async (ProductId, files) => {
    const picture = new FormData()
    Object.values(files).forEach((img, ind) => picture.append(`image${ind}`, img))
    const {data} = await axios.put(`/${route}/img/${ProductId}`, picture)
    console.log(data)
}

