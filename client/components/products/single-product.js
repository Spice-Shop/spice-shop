import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeProduct } from '../../store/products'

class SingleProduct extends Component {
  render() {
    const { product, removeProduct, user } = this.props
    const authorized = user && user.isAdmin
    let productImage = {
      backgroundImage: `url('${product.imgUrl}')`
    }
    return (
      <Link to={`/products/${product.id}`}>
        <div key={product.id} className="product-container">
          <div className="product-name">{product.name}</div>
          <div className="product-imgUrl" style={productImage} />
          <div className="product-description">{product.description}</div>
          <div className="product-rating">{`${'⭐'.repeat(
            product.rating
          )}`}</div>
          <div className="product-price">{`$ ${product.price.toFixed(2)}`}</div>
          {authorized && (
            <button onClick={() => removeProduct(product.id)}>
              <span />
            </button>
          )}
        </div>
      </Link>
    )
  }
}

const mapState = state => {
  return { user: state.user }
}

const mapDispatch = { removeProduct }

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(SingleProduct)
)
