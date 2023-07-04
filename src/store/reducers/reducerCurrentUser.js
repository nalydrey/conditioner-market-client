
export const reducerCurrentUser = (state = null, action) => {
    switch(action.type){
        case 'ENTER_USER': return {...action.payload}
        // case 'ADD_COMMENT_TO_USER': {
        //         console.log(action)
        //         const ind = state.findIndex(product => product._id === action.id)
        //         state[ind].comments = [...state[ind].comments, action.payload]
        //         return [...state]
        // }
        case 'EXIT_USER': {
            localStorage.removeItem('user')
            return null
        }
        default: return state
    }
}