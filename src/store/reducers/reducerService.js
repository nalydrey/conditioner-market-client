import axios from "../../utils/axios";

const initialState = []

export const reducerService = (state = initialState, action) =>{
    switch (action.type) {
        case 'LOAD_ALL_SERVICES':return [...action.payload]
        case 'ADD_SERVICE': return [...state, action.payload]
        case 'FILL_SERVICE': {
            state[action.index] ={...state[action.index], [action.name]: action.payload}
            return [...state]
        }
        case 'LOAD_SERVICE': {
            console.log(action)
            state[action.index] =action.payload
            return [...state]
        }
        case 'DELETE_SERVICE':  {

           return [...state.filter((_, ind) => ind !== action.payload)]
        }
        default: return state
    }
}

export default reducerService