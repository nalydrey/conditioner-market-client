
export const reducerProductCards = (state=[], action) =>{
    switch (action.type){
        case 'GET_ALL_PRODUCTS': return [...action.payload]
        case 'CHANGE_RATING': {
            return [...state.map(product => {
              if(product._id === action.id) {
                  product.averageRating = action.payload
                  return product
              }
              return product
            })]
        }
        case 'TOGGLE_FAVORITE': {
            console.log(action)
                return [...state.map(product => {
                    console.log(product)
                    if(product._id === action.id) {
                        action.isAdd
                        ?
                            product.favorites = [...product.favorites, action.payload]
                        :
                            product.favorites =  product.favorites.filter(user => user !== action.payload)
                    }
                    return product
                })]
        }
        case 'ADD_PROP_TO_PRODUCT': {
            console.log(action)
            const ind = state.findIndex(product => product._id === action.id)
            state[ind][action.prop] = [...state[ind][action.prop], action.payload]
            return [...state]
        }
        default: return state
    }
}