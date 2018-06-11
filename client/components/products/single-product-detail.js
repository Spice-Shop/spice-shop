import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class SingleProductDetail extends Component {
    // MAY NEED TO USE THIS
    // componentWillReceiveProps (newProps, oldProps) {
    //     if(newProps.product !== oldProps.product) {
    //         this.setState({
    //             product: newProps.product
    //         })
    //     }
    // }

    render() {
        console.log(this.props.location.pathname)
        const thisOne = this.props.location.pathname.slice(10)
        console.log(thisOne)
        const products = this.props.state.products
        const product = this.props.state.products.filter((item) => item.id )   
        // const product = this.state.product
        // let productImage = {
        //     backgroundImage: `url('${product.imgUrl}')`
        //   }
          return (
            <div key={product.id} className="product-container">
              <div className="product-name">{product.name}</div>
              <div className="product-imgUrl" style={productImage} />
              <div className="product-description">
                {product.description}
              </div>
              <div className="product-rating">{`${'⭐'.repeat(product.rating)}`}</div>
              <div className="product-price">{`$ ${product.price.toFixed(2)}`}</div>
              {/* {<button onSubmit={() => updateCart(product)} type="submit" className="product-add-to-cart">Add to Cart</button>} */}
            </div> 
          )
    }
}

const mapProducts = state => {
    return {
      state
    }
  }
    

export default withRouter(connect(mapProducts)(SingleProductDetail))
