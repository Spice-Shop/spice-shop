import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import ContentEditable from 'react-contenteditable'
import { fetchProducts, updateProduct } from '../../store/products'

class SingleProductDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {}
    }
    this.onProductUpdate = this.onProductUpdate.bind(this)
  }

  componentWillReceiveProps(newProps, oldProps) {
    if (newProps.products !== oldProps.products) {
      this.setState({
        product: newProps.products.filter(
          item => item.id === Number(this.props.match.params.id)
        )[0]
      })
    }
  }
  onProductUpdate(productUpdateObj) {
    const { debouncedUpdateProduct } = this.props
    const { product } = this.state
    this.setState({
      product: Object.assign(product, productUpdateObj)
    })
    debouncedUpdateProduct(Number(this.props.match.params.id), productUpdateObj)
  }

  render() {
    const { user } = this.props
    const authorized = !(user.id && user.isAdmin)
    const productId = Number(this.props.match.params.id)
    const products = this.props.products
    const selectedProduct = products.filter(item => item.id === productId)[0]
    return selectedProduct ? (
      <div>
      <div> {authorized ? (<h3>Hey admin! Click on text to edit name and description.</h3>) : (<div />)} </div>
      <div key={selectedProduct.id} className="product-container">
        <ContentEditable
          disabled={!authorized}
          className="product-name"
          value={selectedProduct.name}
          html={selectedProduct.name}
          onChange={evt => this.onProductUpdate({ name: evt.target.value })}
          contentEditable={!!authorized}
        />
        <img className="product-imgUrl" src={selectedProduct.imgUrl} />
        <ContentEditable
          disabled={!authorized}
          value={selectedProduct.description}
          html={selectedProduct.description}
          onChange={evt =>
            this.onProductUpdate({ description: evt.target.value })
          }
          contentEditable={!!authorized}
        />
        <div className="product-rating">
          {`${'⭐'.repeat(selectedProduct.rating)}`}
        </div>
        <div className="product-price">
          {`$ ${selectedProduct.price.toFixed(2)}`}
        </div>
      </div>
      </div>
    ) : (
      <h3>PRODUCT NOT FOUND</h3>
    )
  }
}

const mapProducts = ({ user, products }, ownProps) => {
  return { user, products }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  debouncedUpdateProduct: _.debounce((...args) => {
    dispatch(updateProduct(...args))
  }, 500)
})

export default withRouter(
  connect(
    mapProducts,
    mapDispatchToProps
  )(SingleProductDetail)
)
