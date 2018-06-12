import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { updateQuantity, changeLineItemQuantity } from  '../../store/cart'

/**
 * COMPONENT
 */

const CartItems = (props) => {
  //set cart var
  const cart = props.state.cart
  //set products var
  const products = props.state.products
  const updateQuant = props.updateQuant
  const handleChange = props.handleChange
  const userId = props.state.user.id

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
      <div className="cart-container">
        <h3>Cart</h3>
        <div className="parent-cart-container">
          {/* Map over cart line items and print out the information */}
          {cart.map((cartItem) => {
            //Filter products by cart line item id
            let myProduct = products.find(product => product.id === cartItem.productId)
            //Create product image style
            let myProductImage = {
              backgroundImage: `url(${myProduct && myProduct.imgUrl})`
            }
            return (
              myProduct &&
              <div key={cartItem.productId} className="cart-item-container">
                <div className="my-product-image-container">
                  <div className="my-product-imgUrl" style={myProductImage} />
                </div>
                <div className="my-product-text-container">
                  <div className="my-product-name">{myProduct.name}</div>
                  <div className="my-product-description">{myProduct.description}</div>
                  <div className="my-product-rating">{myProduct.rating}</div>
                  <div className="product-price">{myProduct.price}</div>
                </div>
                <div className="my-product-quantity-container">
                    <input onChange={(event) => handleChange(cartItem, event)} className="my-product-quantity-input" name="cart-item-quantity" defaultValue={cartItem.quantity} />
                    <button onClick={() => updateQuant(cartItem, userId) } className="my-product-quantity-button" type="submit" name="update-quantity">Update</button>
                    <div className="my-product-subtotal">{(myProduct.price * cartItem.quantity).toFixed(2)}</div>
                </div>
              </div>
            )
          })}
          <div className="cart-total">{/* PUT SUBTOTAL ON STATE, THIS SHOULD BE RENDERED BY TOTAL ON STATE */}</div>
          <button className="cart-submit" type="submit">Checkout</button>
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

const mapDispatch = (dispatch) => {
  return {
    handleChange: (cartItem, event) => {
      let quantity = event.target.value
      dispatch(changeLineItemQuantity(quantity, cartItem))
    },
    updateQuant: (cartItem, userId) => dispatch(updateQuantity(cartItem, userId))
  }
}

export const Cart = withRouter(connect(mapCart, mapDispatch)(CartItems))
