import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class SingleProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: props.product
        }
    }

    // MAY NEED TO USE THIS
    // componentWillReceiveProps (newProps, oldProps) {
    //     if(newProps.product !== oldProps.product) {
    //         this.setState({
    //             product: newProps.product
    //         })
    //     }
    // }

    render() {
        const product = this.state.product
        let productImage = {
            backgroundImage: `url('${product.imgUrl}')`
          }
          return (
            <Link to={`/products/${product.id}`}>
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
            </Link>
          )
    }
}
    

export default SingleProduct
