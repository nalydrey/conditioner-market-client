import axios from "../../../utils/axios";

const route = 'main'
export const changeContactOS = async (contact) => {
    const {data} = await axios.put(`/${route}`, contact)
    return data
}
export const getContactFS = async () => {
    const {data} = await axios.get(`/${route}`)
    return data
}
