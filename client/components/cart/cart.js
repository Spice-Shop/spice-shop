import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

/**
 * COMPONENT
 */

const CartItems = (props) => {
  const cart = props.state.products;

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
          {cart.map((cartItem) => {
            let cartImage = {
              backgroundImage: `url('images/${cartItem.imgUrl}')`
            }
            return (
              <div key={cartItem.id} className="cartItem-container">
                <div className="cart-item-name">{cartItem.name}</div>
                <div className="cart-item-imgUrl" style={cartImage} />
                <div className="cart-item-description">{cartItem.description}</div>
                <div className="cart-item-rating">{cartItem.rating}</div>
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

export const Cart = connect(mapCart)(CartItems)
