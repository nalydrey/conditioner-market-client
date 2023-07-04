import axios from "../../../utils/axios";
import {showMessage} from "../../../store/actionCreators/actionCreatorSnack";

const route = 'faqs'
export const createFaqFS = async (payload) => {
    const {data} =await axios.post(`/${route}`, payload)
    showMessage(data.message, data.typeMessage)
    return data.faq
}
export const changeFaqFS = async (payload, id) => {
    const {data} =await axios.put(`/${route}/${id}`, payload)
    console.log(data)
    showMessage(data.message, data.typeMessage)
    return data.faq
}
export const deleteFaqFS = async ( id) => {
    const {data} =await axios.delete(`/${route}/${id}`)
    showMessage(data.message, data.typeMessage)
    return data.typeMessage==='success' ? true : false
}
export const getFaqsFS = async () => {
    const {data} =await axios.get(`/${route}`)
    showMessage(data.message, data.typeMessage)
    console.log(data)
    return data.faqs
}