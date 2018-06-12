import axios from 'axios'

/* INITIAL STATE */
const initialProducts = []

/* ACTION TYPES */
const GET_PRODUCTS = 'GET_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

/* ACTION CREATORS */
const getProducts = products => ({ type: GET_PRODUCTS, products })
const create = product => ({ type: CREATE_PRODUCT, product })
const update = product => ({ type: UPDATE_PRODUCT, product })
const remove = id => ({ type: REMOVE_PRODUCT, id })

/* THUNK CREATORS */
export const fetchProducts = () => dispatch => {
  axios
    .get('/api/products')
    .then(result => dispatch(getProducts(result.data)))
    .catch(err => console.error('Fetching products unsuccessful', err))
}
export const addProduct = product => dispatch => {
  axios
    .post('/api/products', product)
    .then(res => dispatch(create(res.data)))
    .catch(err =>
      console.error(`Creating product: ${product} unsuccessful`, err)
    )
}
export const updateProduct = (id, product) => dispatch => {
  axios
    .put(`/api/products/${id}`, product)
    .then(res => dispatch(update(res.data)))
    .catch(err =>
      console.error(`Updating product: ${product} unsuccessful`, err)
    )
}
export const removeProduct = id => dispatch => {
  axios
    .delete(`/api/products/${id}`)
    .then(() => dispatch(remove(id)))
    .catch(err => console.error(`Removing product: ${id} unsuccessful`, err))
}

/* REDUCER */
export default function(products = initialProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case CREATE_PRODUCT:
      return [action.product, ...products]
    case UPDATE_PRODUCT:
      return products.map(
        product => (action.product.id === product.id ? action.product : product)
      )
    case REMOVE_PRODUCT:
      return products.filter(product => product.id !== action.id)
    default:
      return products
  }
}
