import axios from "../../../utils/axios";
import {showMessage} from "../../../store/actionCreators/actionCreatorSnack";

export const changeRatingOS = async (payload, productId) => {
    const {data} =await axios.post(`/rating/${productId}`, payload)
    showMessage(data.message, data.typeMessage)
    return {rating: data.rating, averageRating: data.averageRating}
}

