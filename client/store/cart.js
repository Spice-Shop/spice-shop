import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialCart = [{
  id: 1,
  quantity: 1,
  productId: 1,
  orderId: 1
},{
  id: 2,
  quantity: 2,
  productId: 2,
  orderId: 1
}]

/**
 * ACTION CREATORS
 */
const getCart = cartItems => ({type: GET_CART, cartItems})
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
    // case REMOVE_USER:
    //   return defaultUser
    default:
      return state
  }
}
