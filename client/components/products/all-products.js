import React, { Component } from 'react'
import { connect } from 'react-redux'

//--------------Component-------------------
class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filtered: 0
    }
    //make this variable clearer in WHAT IT DOES
    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter(e) {
    let value = parseInt(e.target.name, 10) //CG:make variable names clearer. 
    this.setState({ filtered: value })
  }

  render() {
    console.log(this.props.state); //CG: remove console.logs 
    const {updateCart} = this.props.state
    const products = this.props.state.products || []

    const filteredProducts = this.state.filtered
//CG whats this cool line all about? 
      ? products.filter(product => {
          return product.rating === this.state.filtered
        })
      : products

      //CG: class can be dependent on state. 


      /*
        .product-thumbnail {

          &-name {

          }

          &-image {

          }


        }

        



      */
    return (
      <div className="main-product-container">
        <h3>Products</h3>
        <h2>
          <button name="1" onClick={this.handleFilter}>
            ⭐️
          </button>
          <button name="2" onClick={this.handleFilter}>
            ⭐️
          </button>
          <button name="3" onClick={this.handleFilter}>
            ⭐️
          </button>
          <button name="4" onClick={this.handleFilter}>
            ⭐️
          </button>
          <button name="5" onClick={this.handleFilter}>
            ⭐️
          </button>
        </h2>
        <div className="parent-product-container">
          {filteredProducts.length ? (
            filteredProducts.map(product => {
              let productImage = {
                backgroundImage: `url('${product.imgUrl}')`
              } //CG: avoid doing this. make img with src.
              return (
                <div key={product.id} className="product-thumbnail">
                {/* CG: CHANGED CLASS NAMES */}
                  <div className="product-thumbnail-name">{product.name}</div>
                  <img className="product-image" src={product.imgUrl} />
                  <div className="product-description">
                    {product.description}
                  </div>
                  <div className="product-rating">{product.rating}</div>
                  <div className="product-price">{product.price}</div>
                  <button onSubmit={() => updateCart(product)} type="submit" className="product-add-to-cart">Add to Cart</button>
                </div> 
              )
            })
          ) : (
            <h2>No products available with that rating.</h2>
          )}
        </div>
      </div>
    )
  }
}

//THESE ARE OUR MAP PROPS
//CG: make sure you grab what you need and get out!
const mapProducts = state => {
  return {
    state
  }
}

const mapDispatch = dispatch => {
  return {
    updateCart: (product) => {
      console.log(this.props.state.cart) //CG: No
    }
  }
}

export const AllProducts = connect(mapProducts, mapDispatch)(Products)
