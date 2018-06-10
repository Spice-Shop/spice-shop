import React, { Component } from 'react'
import { connect } from 'react-redux'
const pkg = require('../../package.json')

//--------------Component-------------------
class HomeItems extends Component {
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
        const products = this.props.state.products || []
        const filteredProducts = this.state.filtered
            ? products.filter(product => {
                return product.rating === this.state.filtered
            })
            : products
        return (
            <div className="main-home-container">
                <div className="home-hero">
                    <div className="home-hero-overlay">
                        <div className="home-content">
                            <div className="home-small-title">Established in 2018</div>
                            <div className="home-title">{pkg.title}</div>
                            <div className="home-small-title">Market &amp; Trading Co</div>
                        </div>
                    </div>
                </div>
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
                            }
                            return (
                                <div key={product.id} className="product-container">
                                    <div className="product-name">{product.name}</div>
                                    <div className="product-imgUrl" style={productImage} />
                                    <div className="product-description">{product.description}</div>
                                    <div className="product-rating">{product.rating}</div>
                                    <div className="product-price">{product.price}</div>
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
const mapProducts = state => {
    return {
        state
    }
}

export const Home = connect(mapProducts)(HomeItems)
