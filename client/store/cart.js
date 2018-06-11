import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */

 //CG: MAKE SURE TO REMOVE THIS
const initialCart = [{
  id: 1,
  quantity: 1,
  productId: 1,
  orderId: 1
}, {
  id: 2,
  quantity: 2,
  productId: 2,
  orderId: 1
}]

/**
 * ACTION CREATORS
 */
const getCart = cartItems => ({type: GET_CART, cartItems})

const addToCart = cartItem => ({type: ADD_TO_CART, cartItem})
// const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
// export function fetchProducts() {
//     return function thunk(dispatch) {
//       return axios
//         .get('/api/cartItems')
//         .then(res => res.data)
//         .then(cartItems => {
//           const action = getProducts(cartItems);
//           dispatch(action);
//         })
//         .catch(err => console.log(err))
//     };
//   }

/**
 * REDUCER
 */
export default function (state = initialCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cartItems
    case ADD_TO_CART:
      return action.cartItem
    // case REMOVE_USER:
    //   return defaultUser
    default:
      return state
  }
}
