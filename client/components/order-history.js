import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CartItems from './cart/cart'
import { fetchOrderHistory } from  '../store/order-history'

class History extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchOrderHistory(this.props.userId)
  }

  render() {
    const orderHistory = this.props.orderHistory
    console.log("HELLO", orderHistory)
    return (
      <div className="main-product-container">
        <h3>Order History</h3>
        <div className="parent-product-container">
          {typeof orderHistory !== 'string' ? (
            orderHistory.map(order => (
            <div key={order.id} className="product-container">
                <div>Order Number: {order.id}</div>
                {order.products.map(orderLineItems => (
            <div key={orderLineItems.id} className="product-container">
                <div>{orderLineItems.name}</div>
                <div>Quantity: {orderLineItems.orderLineItem.quantity}</div>
            <div className="product-price">
                {`$ ${orderLineItems.price.toFixed(2)}`}
              </div>
            </div>
            ))
          }
            <div className="product-price">
                Order Total: {`$ ${order.total.toFixed(2)}`}
              </div>
            </div>
            ))
          ) : (
            <h2>There are no past orders to display</h2>
          )}
        </div>
      </div>
    )
  }
}

//THESE ARE OUR MAP PROPS
const mapState = state => {
    console.log(state)
  return {
    userId: state.user.id,
    orderHistory: state.orderHistory
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOrderHistory: (userId) => dispatch(fetchOrderHistory(userId))
  }
}

export const OrderHistory = withRouter(
  connect(
    mapState,
    mapDispatch
  )(History)
)
