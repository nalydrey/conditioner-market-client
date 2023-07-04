import {fillCharacteristics} from "../actionCreators/actionCreatorProduct";

const initialState = {
    model:'',
    manufacture:'',
    price: '',
    description:'',
    characteristics:[]
}

const newField = {
    label: '',
    value: '',
    unit: ''
}

export const reducerProduct = (state=initialState, action) => {
    switch (action.type){
        case 'AUTO_FILL_PRODUCT': {
            return {...action.payload}
        }
        case 'FILL_MAIN': return {...state, [action.name]: action.payload}

        case 'CREATE_NEW_FIELD': return {...state, characteristics: [...state.characteristics, newField]}
        case 'DELETE_FIELD': {
            const newArr = state.characteristics.filter((el, ind) => ind !== action.payload )
            return {...state, characteristics: newArr}
        }
        case 'REPLACE_PRODUCT': {

        }
        case 'RESET_PRODUCT': return {...initialState}
        case 'FILL_CHARACTERISTICS':{
            const newArr =  state.characteristics.map((el, ind) => {
                if(ind === action.index){
                    return {...el, [action.name]: action.payload}
                }
                return el
            })
            return {...state, characteristics: newArr}
        }
        default: return state
    }
}
