import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import SingleProduct from './single-product'

/**
 * COMPONENT
 */
const Products = (props) => {
  const products = props.state.products;

  return (
    <div>
      <h3>Products</h3>
      <div>
        <h3>There are no products to display</h3>
      </div>
      {/* <SingleProduct /> */}
      <div className="parent-product-container">
        {products.map((product) => {
          let productImage = {
            backgroundImage: `url('images/${product.imgUrl}')`
          }
          return (
            <div key={product.id} className="product-container">
              <div className="product-name">{product.name}</div>
              <div className="product-imgUrl" style={productImage} />
              <div className="product-description">{product.description}</div>
              <div className="product-rating">{product.rating}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

//THESE ARE OUR MAP PROPS
const mapProducts = (state) => {
  return {
    state
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//     handleSubmit (evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const email = evt.target.email.value
//       const password = evt.target.password.value
//       dispatch(auth(email, password, formName))
//     }
//   }
// }

export const AllProducts = connect(mapProducts)(Products)