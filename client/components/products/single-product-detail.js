import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../../store/products'

class SingleProductDetail extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchInitialData()
    }
    render() {
        const productId = Number(this.props.match.params.id)
        console.log(this.props)
        const products = this.props.products
        const selectedProduct = products.filter((item) => item.id === productId)   
        console.log(selectedProduct)
            return "hi" || (
            <div key={selectedProduct.id} className="product-container">
              <div className="product-name">{selectedProduct.name}</div>
              <div className="product-imgUrl" src={selectedProduct.imgUrl} />
              <div className="product-description">
                {selectedProduct.description}
              </div>
              <div className="product-rating">{`${'⭐'.repeat(selectedProduct.rating)}`}</div>
              <div className="product-price">{`$ ${selectedProduct.price.toFixed(2)}`}</div>
              {/* {<button onSubmit={() => updateCart(selectedProduct)} type="submit" className="product-add-to-cart">Add to Cart</button>} */}
            </div> 
          )
    }
}

const mapProducts = state => {
    return {
      products: state.products
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        fetchInitialData: () => dispatch(fetchProducts())
    }
}
    
export default withRouter(connect(mapProducts, mapDispatchToProps)(SingleProductDetail))
