import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import SingleProduct from './single-product'

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredStars: 0
    }
    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter(e) {
    let value = parseInt(e.target.name, 10)
    this.setState({ filteredStars: value })
  }

  render() {
    const { updateCart } = this.props.state
    const products = this.props.state.products
    const filteredStarsProducts = this.state.filteredStars
      ? products.filter(product => {
          return product.rating >= this.state.filteredStars
        })
      : products
    return (
      <div className="main-product-container">
        <h3>Products</h3>
        <h2>
          <button name="1" className="star-buttons" onClick={this.handleFilter}>
            {this.state.filteredStars <= 1 ? '⭐️' : '💩'}
          </button>
          <button name="2" className="star-buttons" onClick={this.handleFilter}>
            {this.state.filteredStars <= 2 ? '⭐️' : '💩'}
          </button>
          <button name="3" className="star-buttons" onClick={this.handleFilter}>
            {this.state.filteredStars <= 3 ? '⭐️' : '💩'}
          </button>
          <button name="4" className="star-buttons" onClick={this.handleFilter}>
            {this.state.filteredStars <= 4 ? '⭐️' : '💩'}
          </button>
          <button name="5" className="star-buttons" onClick={this.handleFilter}>
            ⭐️
          </button>
        </h2>
        <div className="parent-product-container">
          {filteredStarsProducts.length ? (
            filteredStarsProducts.map(product => (
              <SingleProduct product={product} key={product.id} />
            ))
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
    updateCart: product => {
      console.log(this.props.state.cart)
    }
  }
}

export const AllProducts = withRouter(
  connect(
    mapProducts,
    mapDispatch
  )(Products)
)
