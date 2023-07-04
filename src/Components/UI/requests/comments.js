import axios from "../../../utils/axios";
import {showMessage} from "../../../store/actionCreators/actionCreatorSnack";


const route = 'comments'
export const getProductComments = async (ProductId) => {
    const {data} =await axios.get(`/${route}/product/${ProductId}`)
    return data.comments
}
export const getMyCommentsFS = async () => {
    const {data} =await axios.get(`/${route}/me`)
    return data.comments
}

export const addNewComment = async (text, productId) => {
     const {data} = await axios.post(`/${route}/${productId}`, {text})
     showMessage(data.message ,data.typeMessage)
     return data.comment
}

export const deleteCommentFS = async (commentId) => {
     const {data} = await axios.delete(`/${route}/${commentId}`, )
     showMessage(data.message ,data.typeMessage)
     return data.typeMessage === 'success' ? true : false
}
export const changeCommentOS = async (commentId, text) => {
     const {data} = await axios.put(`/${route}/${commentId}`, {text} )
     showMessage(data.message ,data.typeMessage)
     return data.comment
}