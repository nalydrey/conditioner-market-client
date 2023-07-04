const initialState = []

export const reducerFaq = (state = initialState, action) =>{
    switch (action.type) {
        case 'ADD_FAQ': return [...state, action.payload]
        case 'FILL_FAQ': {
            console.log(action)
            state[action.index] ={...state[action.index], [action.name]: action.payload}
            return [...state]
        }
        case 'LOAD_ALL_FAQS': return [...action.payload]
        case 'DELETE_FAQ': return [...state.filter((_, ind)=> action.payload !== ind)]
        case 'LOAD_FAQ': {
            console.log(action)
            state[action.index] = action.payload
            return [...state]
        }
        default: return state
    }
}
export default reducerFaq