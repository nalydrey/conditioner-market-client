const initialState = {
    text: '',
    isOpen: false,
    func: () => {'SEND FORM'}
}

export const reducerCommentModal = (state=initialState, action) => {
    switch (action.type){
        case 'OPEN_COMMENT_FORM': return {...state, isOpen: true, func: action.payload}
        case 'CLOSE_COMMENT_FORM':{
            return {...initialState}
        }
        case 'FILL_COMMENT_FORM': return {...state, text: action.payload}
        default: return state
    }
}