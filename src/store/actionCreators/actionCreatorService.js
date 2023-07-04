import store from "../store";

export const addService = (service) => {
    store.dispatch({type:'ADD_SERVICE', payload: service})
}
export const deleteService = (ind) => {
    store.dispatch({type:'DELETE_SERVICE', payload:ind})
}
export const fillService = (name, payload, index) => {
    store.dispatch({type:'FILL_SERVICE', name, payload, index})
}
export const loadService = (payload, index) => {
    store.dispatch({type:'LOAD_SERVICE', payload, index})
}
export const loadAllServices = (payload) => {
    store.dispatch({type:'LOAD_ALL_SERVICES', payload})
}

