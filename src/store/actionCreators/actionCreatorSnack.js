import store from "../store";

export const showMessage = (message, type) => {
    store.dispatch({type:'SHOW_MESSAGE', payload: type, message})
}
export const controlMessage = (bool) => {
    store.dispatch({type:'CONTROL_SNACK', payload:bool})
}