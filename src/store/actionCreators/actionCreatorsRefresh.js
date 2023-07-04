import store from "../store";

export const refreshOfficeUsers = () => {
    store.dispatch({type: 'REFRESH_OFFICE_USERS'})
}
export const refreshBooks = () => {
    store.dispatch({type: 'REFRESH_BOOKS'})
}