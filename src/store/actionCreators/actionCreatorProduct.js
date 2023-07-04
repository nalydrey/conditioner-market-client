import store from "../store";

export const fillMain = (field, text) => {
    store.dispatch({type: 'FILL_MAIN', name: field, payload: text})
}
export const fillCharacteristics = (field, text, index) => {
    store.dispatch({type: 'FILL_CHARACTERISTICS', name: field, payload: text, index})
}
export const autoFillProduct = (arr) => {
    store.dispatch({type: 'AUTO_FILL_PRODUCT',  payload: arr})
}
export const deleteField = (ind) => {
    store.dispatch({type: 'DELETE_FIELD',  payload: ind})
}
export const createNewField = () => {
    store.dispatch({type: 'CREATE_NEW_FIELD'})
}
export const fillNewField = (name, payload, index) => {
    store.dispatch({type: 'FILL_CHARACTERISTICS', name, payload, index})
}
export const resetProduct = () => {
    store.dispatch({type: 'RESET_PRODUCT'})
}

