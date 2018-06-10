import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
/**
 * COMPONENT
 */

const CartItems = (props) => {
  //set cart var
  const cart = props.state.cart;
  //set products var
  const products = props.state.products;

  // const findProductsById = (products, id) => {
  //   products.filter
  // }

  if (cart.length === 0) {
    return (
      <div>
        <h3>Cart</h3>
        <div>
          <h3>There are no products in your cart!</h3>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <h3>Cart</h3>
        <div className="parent-cart-container">
          {/* Map over cart line items and print out the information */}
          {cart.map((cartItem) => {
            //Filter products by cart line item id
            let myProduct = products.filter(product => product.id === cartItem.productId)
            //Create product image style
            let myProductImage = {
              backgroundImage: `url('images/${myProduct.length && myProduct[0].imgUrl}')`
            }
            return (
              myProduct.length &&
              <div key={cartItem.id} className="cartItem-container">
                <div className="cart-item-quantity">{cartItem.quantity}</div>
                <div className="my-product-name">{myProduct[0].name}</div>
                <div className="my-product-imgUrl" style={myProductImage} />
                <div className="my-product-description">{myProduct[0].description}</div>
                <div className="my-product-rating">{myProduct[0].rating}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

//THESE ARE OUR MAP PROPS
const mapCart = (state) => {
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

export const Cart = withRouter(connect(mapCart)(CartItems))
