import axios from "../../../utils/axios";
import { showMessage} from "../../../store/actionCreators/actionCreatorSnack";

const route = 'reviews'
export const createReviewOS = async (payload) => {
    console.log(payload)
    const {data} = await axios.post(`/${route}`, {text: payload})
    showMessage(data.message, data.typeMessage)
    return data
}
export const changeReviewOS = async (payload, reviewId) => {
    console.log(payload)
    const {data} = await axios.put(`/${route}/${reviewId}`, {text: payload})
    console.log(data)
    showMessage(data.message, data.typeMessage)
    return data.review
}
export const deleteReviewFS = async (reviewId) => {
    console.log(reviewId)
    const {data} = await axios.delete(`/${route}/${reviewId}`)
    showMessage(data.message, data.typeMessage)
    return data
}
export const getAllReviewsFS = async () => {
    const {data} = await axios.get(`/${route}`)
    showMessage(data.message, data.typeMessage)
    return data
}


