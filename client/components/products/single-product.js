import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeProduct } from '../../store/products'
import { addLineItem } from '../../store/cart'

class SingleProduct extends Component {
  render() {
    const { product, removeProduct, user, addLineItem } = this.props
    const authorized = !!(user.id && user.isAdmin)
    let productImage = {
      backgroundImage: `url('${product.imgUrl}')`
    }
    return (
      <div key={product.id} className="product-container">
        <Link to={`/products/${product.id}`}>
          <div className="product-name">{product.name}</div>
          <div className="product-imgUrl" style={productImage} />
        </Link>
        <div className="product-rating">
          {`${'⭐'.repeat(product.rating)}`}
        </div>
        <div className="product-description">{product.description}</div>
        <div className="product-price">{`$ ${product.price.toFixed(2)}`}</div>
        {user && user.id && <div className="product-button-container"><button onClick={() => addLineItem(user.id, product.id)}>Add To Cart</button></div>}
        {/* {authorized && (
          <button onClick={() => removeProduct(product.id)}>Delete</button>
        )} */}
      </div>
    )
  }
}

const mapState = state => {
  return { user: state.user }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    removeProduct,
    addLineItem: (userId, productId) => dispatch(addLineItem(userId, productId, ownProps.history))
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(SingleProduct)
)
