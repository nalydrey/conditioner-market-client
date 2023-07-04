import axios from "axios";
import { home } from "../../App/App";



export const sendToTelegram = async (text) => {
    const {data} = await axios.post(`${home}api/telegram`, {text})
    return data
}
