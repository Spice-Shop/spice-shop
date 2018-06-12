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
      product: props.product
    }
    this.onProductUpdate = this.onProductUpdate.bind(this)
  }
  componentWillReceiveProps(newProps, oldProps) {
    if (newProps.product !== oldProps.product) {
      this.setState({
        product: newProps.product
      })
    }
  }
  // componentDidMount() {
  //     this.props.fetchInitialData()
  // }
  onProductUpdate(productUpdateObj) {
    const { debouncedUpdateProduct } = this.props
    const { product } = this.state
    this.setState({
      product: Object.assign(product, productUpdateObj)
    })
    debouncedUpdateProduct(product.id, productUpdateObj)
  }

  render() {
    const { currentUser } = this.props
    const authorized = currentUser && currentUser.isAdmin
    const productId = Number(this.props.match.params.id)
    const products = this.props.products
    const selectedProduct = products.filter(item => item.id === productId)[0]
    return selectedProduct ? (
      <div key={selectedProduct.id} className="product-container">
        <input
          readOnly={!authorized}
          className="product-name"
          value={selectedProduct.name}
          onChange={evt => this.onProductUpdate({ name: evt.target.value })}
          contentEditable={!!authorized}
        />
        <img className="product-imgUrl" src={selectedProduct.imgUrl} />
        <input
          readOnly={!authorized}
          className="product-description"
          value={selectedProduct.description}
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
        <ContentEditable
          disabled={!authorized}
          placeholder="(text here)"
          html={this.state.product}
          onChange={evt => console.log('hello', evt.target.value)}
        />
      </div>
    ) : (
      <h3>PRODUCT NOT FOUND</h3>
    )
  }
}

const mapProducts = ({ currentUser, products }, ownProps) => {
  const paramId = Number(ownProps.match.params.id)
  return { products, currentUser }
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
