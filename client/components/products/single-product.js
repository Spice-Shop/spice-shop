import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeProduct } from '../../store/products'

class SingleProduct extends Component {
  render() {
    const { product, removeProduct, user } = this.props
    const authorized = !!(user.id && user.isAdmin)
    let productImage = {
      backgroundImage: `url('${product.imgUrl}')`
    }
    return (
      <div key={product.id} className="product-container">
        <Link to={`/products/${product.id}`}>
          <div className="product-name">{product.name}</div>
          <div className="product-imgUrl" style={productImage} />
          <div className="product-description">{product.description}</div>
          <div className="product-rating">
            {`${'⭐'.repeat(product.rating)}`}
          </div>
          <div className="product-price">{`$ ${product.price.toFixed(2)}`}</div>
        </Link>
        {authorized && (
          <button onClick={() => removeProduct(product.id)}>Delete</button>
        )}
      </div>
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
