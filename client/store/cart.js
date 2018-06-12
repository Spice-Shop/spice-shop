import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const CHANGE_LINE_ITEM_QUANTITY = 'CHANGE_LINE_ITEM_QUANTITY'
const UPDATE_LINE_ITEM_QUANTITY = 'UPDATE_LINE_ITEM_QUANTITY'
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialCart = []

/**
 * ACTION CREATORS
 */
export const getCart = cartItems => ({type: GET_CART, cartItems})
export const addToCart = cartItem => ({type: ADD_TO_CART, cartItem})
export const changeLineItemQuantity = (quantity, cartItem) => ({type: CHANGE_LINE_ITEM_QUANTITY, quantity, cartItem})
export const updateLineItemQuantity = quantity => ({type: UPDATE_LINE_ITEM_QUANTITY, quantity})
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

export function updateQuantity(cartItem, userId) {
  return function thunk(dispatch) {
    return axios
        .put(`/api/users/${userId}/cart`, cartItem)
        // .then(cartItems => {
        //   const action = getCart(cartItems.data);
        //   dispatch(action);
        // })
        // .catch(err => console.log(err))
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
      return [...state, action.cartItem]
    case CHANGE_LINE_ITEM_QUANTITY:
      return 
    case UPDATE_LINE_ITEM_QUANTITY:
      return action.quantity
    // case REMOVE_USER:
    //   return defaultUser
    default:
      return state
  }
}
