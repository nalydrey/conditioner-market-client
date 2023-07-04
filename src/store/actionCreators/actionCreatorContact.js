import store from "../store";

export const changeContact = (name, payload) => {
    store.dispatch({type:'CHANGE_CONTACT',name, payload})
}
export const loadContact = ( payload) => {
    store.dispatch({type:'LOAD_CONTACT', payload})
}
