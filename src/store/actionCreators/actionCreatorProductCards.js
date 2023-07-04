import store from "../store";

export const getAllProducts = (payload) => {
    store.dispatch({type: 'GET_ALL_PRODUCTS', payload})
}
export const addPropToProduct = (prop, id, payload) => {
    store.dispatch({type: 'ADD_PROP_TO_PRODUCT', prop ,id, payload})
}
export const changeRating = ( id, payload) => {
    store.dispatch({type: 'CHANGE_RATING',  id, payload})
}
export const toggleFavorite = ( isAdd, id, payload) => {
    store.dispatch({type: 'TOGGLE_FAVORITE',  isAdd, id, payload})
}

