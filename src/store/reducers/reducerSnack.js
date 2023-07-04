const initialState = {
    message: '',
    type: 'info',
    isOpen: false
}

export const reducerSnack = (state=initialState, action) => {
    switch (action.type){
        case 'SHOW_MESSAGE': return {...state, message: action.message, type: action.payload, isOpen: true}
        case 'CONTROL_SNACK': return {...state, isOpen: action.payload}
        default: return state
    }
}