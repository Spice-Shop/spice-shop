import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const products = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
// const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export function fetchProducts() {
    return function thunk(dispatch) {
      return axios
        .get('/api/products')
        .then(res => res.data)
        .then(products => {
          const action = getProducts(products);
          dispatch(action);
        });
    };
  }

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
