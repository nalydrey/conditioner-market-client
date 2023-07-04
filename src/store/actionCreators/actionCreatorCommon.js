import store from "../store";

export const getAllModels = (payload) => {
    store.dispatch({type:'GET_ALL_MODELS', payload})
}
export const addNewManufacture = (payload) => {
    store.dispatch({type:'ADD_NEW_MANUFACTURE', payload})
}