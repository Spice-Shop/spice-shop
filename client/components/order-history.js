import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchOrderHistory } from  '../store/order-history'

class History extends Component {

  componentDidMount() {
    this.props.fetchOrderHistory(this.props.userId)
  }

  render() {
    const orderHistory = this.props.orderHistory
    return (
      <div className="main-product-container">
        <h3>Order History</h3>
        <div className="parent-product-container">
          {typeof orderHistory !== 'string' ? (
            orderHistory.map(order => (
            <div key={order.id} className="product-container">
                <div className="order-number">Order Number: {order.id}</div>
                {order.products.map(orderLineItems => (
            <div key={orderLineItems.id} className="line-item-container">
                <div>{orderLineItems.name}</div>
                <div>Quantity: {orderLineItems.orderLineItem.quantity}</div>
            <div className="product-price">
                {`$ ${orderLineItems.price.toFixed(2)}`}
              </div>
            </div>
            ))
          }
            <div className="order-history-total">
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
