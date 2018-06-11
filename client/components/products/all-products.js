import React, { Component } from 'react'
import { connect } from 'react-redux'
import SingleProduct from './single-product' 

//--------------Component-------------------
class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filtered: 0
    }
    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter(e) {
    let value = parseInt(e.target.name, 10)
    this.setState({ filtered: value })
  }

  render() {
    console.log(this.props.state);
    const {updateCart} = this.props.state
    const products = this.props.state.products || []

    const filteredProducts = this.state.filtered

      ? products.filter(product => {
          return product.rating === this.state.filtered
        })
      : products
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
            filteredProducts.map(product => <SingleProduct product={product} key={product.id} />)
          ) : (
            <h2>No products available with that rating.</h2>
          )}
        </div>
      </div>
    )
  }
}

//THESE ARE OUR MAP PROPS
const mapProducts = state => {
  return {
    state
  }
}

const mapDispatch = dispatch => {
  return {
    updateCart: (product) => {
      console.log(this.props.state.cart)
    }
  }
}

export const AllProducts = connect(mapProducts, mapDispatch)(Products)
