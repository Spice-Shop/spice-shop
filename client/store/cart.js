import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_LINE_ITEM_QUANITY = 'UPDATE_LINE_ITEM_QUANITY'
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
const updateLineItemQuantity = quantity => ({type: UPDATE_LINE_ITEM_QUANITY, quantity})
// const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export function fetchCart(userId) {
    return function thunk(dispatch) {
      return axios
        .get(`/api/users/${userId}/cart`)
        .then(cartItems => {
          const action = getCart(cartItems.data);
          dispatch(action);
        })
        .catch(err => console.log(err))
    };
  }

export function updateQuantity(cartItem) {
  return function thunk(dispatch) {
    return axios
        .put(`/api/users/${userId}/cart`)
        .then(cartItems => {
          const action = getCart(cartItems.data);
          dispatch(action);
        })
        .catch(err => console.log(err))
  }
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
