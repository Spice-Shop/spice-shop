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
const initialCart = []

/**
 * ACTION CREATORS
 */
const getCart = cartItems => ({type: GET_CART, cartItems})

const addToCart = cartItem => ({type: ADD_TO_CART, cartItem})
// const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export function fetchCart(userId) { //A refactor is required via model method to clean this up.
    return function thunk(dispatch) {
      return axios
        .get(`/api/users/${userId}/orders`)
        .then(res => {
          let orderId = res.data[0].id
          axios
          .get(`/api/cart/${orderId}`)
          .then(orderLineItems => orderLineItems.data)
          .then(cartItems => {
            const action = getCart(cartItems);
            dispatch(action);
          })
        })
        .catch(err => console.log(err))
    };
  }

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
