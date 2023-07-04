const initState = {
    manufactures: []
}

export const reducerCommon = (state=initState, action) => {
    switch (action.type){
        case 'GET_ALL_MODELS': return {...state, manufactures: action.payload}
        case 'ADD_NEW_MANUFACTURE': return {...state, manufactures: [...state.manufactures, action.payload]}
        default: return state
    }
}