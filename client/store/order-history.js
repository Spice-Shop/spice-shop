import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'

// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialOrderHistory = []

/**
 * ACTION CREATORS
 */
export const getOrderHistory = orderHistory => ({type: GET_ORDER_HISTORY, orderHistory})

/**
 * THUNK CREATORS
 */
export function fetchOrderHistory(userId) {
    return function thunk(dispatch) {
      return axios
        .get(`/api/users/${userId}/order-history`)
        .then(orderHistory => {
          const action = getOrderHistory(orderHistory.data);
          dispatch(action);
        })
        .catch(err => console.log(err))
    };
  }

/**
 * REDUCER
 */
export default function (state = initialOrderHistory, action) {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return action.orderHistory
    default:
      return state
  }
}
