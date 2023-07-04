import axios from "../../../utils/axios";
import { showMessage} from "../../../store/actionCreators/actionCreatorSnack";

const route = 'service'
export const createService = async (payload) => {
    const {data} = await axios.post(`/${route}`, payload)
        showMessage(data.message, data.typeMessage)
        return data?.service
}
export const refreshService = async (payload, id) => {
    const {data} = await axios.put(`/${route}/${id}`, payload)
        showMessage(data.message, data.typeMessage)
        return data?.service
}
export const deleteServiceFS = async (id) => {
    const {data} = await axios.delete(`/${route}/${id}`)
        showMessage(data.message, data.typeMessage)
        return (data.typeMessage==='success') ? true : false
}
export const getServiceFS = async () => {
    const {data} = await axios.get(`/${route}`)
        return data.service
}


