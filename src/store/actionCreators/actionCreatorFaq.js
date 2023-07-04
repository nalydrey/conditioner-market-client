import store from "../store";

export const addFaq = (faq) => {
    store.dispatch({type:'ADD_FAQ', payload: faq})
}

export const fillFaq = (name, payload, index) => {
    store.dispatch({type:'FILL_FAQ', name, payload, index})
}
export const loadFaq = (payload, index) => {
    store.dispatch({type:'LOAD_FAQ', payload, index})
}
export const deleteFaq = ( payload) => {
    store.dispatch({type:'DELETE_FAQ',  payload})
}
export const loadAllFaqs = ( payload) => {
    store.dispatch({type:'LOAD_ALL_FAQS',  payload})
}

