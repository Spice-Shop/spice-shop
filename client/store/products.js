import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
// const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialProducts = [{
  id: 1,
  name: 'Oregano',
  imgUrl: 'oregano.jpg',
  description: 'great for pizza',
  rating: 5
},
{
  id: 2,
  name: 'Tumeric',
  imgUrl: 'oregano.jpg',
  description: 'great for superpowers',
  rating: 5
},
{
  id: 3,
  name: 'Pepper',
  imgUrl: 'oregano.jpg',
  description: 'can\'t live without it',
  rating: 5
},
{
  id: 4,
  name: 'Curry',
  imgUrl: 'oregano.jpg',
  description: 'I can\t live without it',
  rating: 5
}]

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
// const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
// export function fetchProducts() {
//     return function thunk(dispatch) {
//       return axios
//         .get('/api/products')
//         .then(res => res.data)
//         .then(products => {
//           const action = getProducts(products);
//           dispatch(action);
//         })
//         .catch(err => console.log(err))
//     };
//   }

/**
 * REDUCER
 */
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
