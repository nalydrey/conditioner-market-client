const initialState = {
    name: '',
    tel: '',
    viber: '',
    telegram: '',
    watsapp: ''
}

export const reducerContact = (state=initialState, action) => {
    switch (action.type){
        case 'CHANGE_CONTACT': return {...state, [action.name]: action.payload}
        case 'LOAD_CONTACT': return {...action.payload}
        default: return state
    }
}