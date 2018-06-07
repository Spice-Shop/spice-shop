import axios from 'axios'

/* INITIAL STATE */
const initialProducts = []

/* ACTION TYPES */
const GET_PRODUCTS = 'GET_PRODUCTS'
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/* ACTION CREATORS */
const getProducts = products => ({type: GET_PRODUCTS, products})
// const removeUser = () => ({type: REMOVE_USER})

/* THUNK CREATORS */
export const fetchProducts = () => dispatch => {
  axios
    .get('/api/products')
    .then(result => dispatch(getProducts(result.data)))
    .catch(err => console.error('Fetching products unsuccessful', err))
}

/* REDUCER */
export default function (state = initialProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    // case REMOVE_USER:
    //   return defaultUser
    default:
      return state
  }
}
