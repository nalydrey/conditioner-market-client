import {combineReducers, createStore} from "redux";
import {reducerCurrentUser} from "./reducers/reducerCurrentUser";
import {reducerSnack} from './reducers/reducerSnack'
import {reducerRefresh} from "./reducers/reducerRefresh";
import {reducerProduct} from "./reducers/reducerProduct";
import reducerService from "./reducers/reducerService";
import reducerFaq from "./reducers/reducerFaq";
import {reducerCommentModal} from "./reducers/reducerComentModal";
import {reducerProductCards} from "./reducers/reducerProductCards";
import {reducerCommon} from "./reducers/reducerCommon";
import {reducerContact} from "./reducers/reducerContact";


const rootReducer = combineReducers({
currentUser: reducerCurrentUser,
    snack: reducerSnack,
    refresh: reducerRefresh,
    product: reducerProduct,
    service: reducerService,
    faq: reducerFaq,
    commentModal: reducerCommentModal,
    products: reducerProductCards,
    common: reducerCommon,
    contact: reducerContact
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store