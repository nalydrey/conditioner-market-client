
const initialState = {
    officeUsersRefresh: false,
    bookRefresh:false
}
export const reducerRefresh = (state=initialState, action) => {
    switch(action.type){
        case 'REFRESH_OFFICE_USERS': return {...state, officeUsersRefresh: !state.officeUsersRefresh}
        case 'REFRESH_BOOKS': return {...state, bookRefresh: !state.bookRefresh}
        default: return state
    }
}