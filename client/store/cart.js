import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_LINE_ITEM_QUANTITY = 'UPDATE_LINE_ITEM_QUANTITY'
const CLEAR_CART = 'CLEAR_CART'
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
export const updateLineItemQuantity = quantity => ({type: UPDATE_LINE_ITEM_QUANTITY, quantity})
export const clearCart = () => ({type: CLEAR_CART})
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

export function updateQuantity(cartItem, userId, event) {
  let quantity = event.target.value
  cartItem.quantity = quantity

  return function thunk(dispatch) {
    return axios
        .put(`/api/users/${userId}/cart`, cartItem)
        .then(() => {
          const action = fetchCart(userId);
          dispatch(action);
        })
        .catch(err => console.log(err))
  }
}

export function addLineItem(productId, history) {
  return function thunk(dispatch) {
    console.log(productId)
    return axios
      .post(`/api/users/cart`, {productId: +productId})
      .then(newCartItem => {
        const action = addToCart(newCartItem.data);
        dispatch(action);
        history.push('/cart')
      })
      .catch(err => console.log(err))
  };
}

export function placeOrder(userId) {

  return function thunk(dispatch) {
    return axios
        .put(`/api/users/${userId}/placeOrder`)
        .then(() => dispatch(clearCart()))
        .then(() => {
          const action = fetchCart(userId);
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
      return [...state, action.cartItem]
    case CLEAR_CART:
      return []
    // case REMOVE_USER:
    //   return defaultUser
    default:
      return state
  }
}
