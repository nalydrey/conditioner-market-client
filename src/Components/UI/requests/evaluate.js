import axios from "../../../utils/axios";
import {showMessage} from "../../../store/actionCreators/actionCreatorSnack";

const route = 'eval'
export const createEvalFS = async (payload) => {
    const {data} =await axios.post(`/${route}`, {value: payload})
    showMessage(data.message, data.typeMessage)
    return data
}

export const getEvalFS = async () => {
    const {data} =await axios.get(`/${route}`)
    showMessage(data.message, data.typeMessage)
    return data
}

