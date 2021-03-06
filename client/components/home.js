import React, { Component } from 'react'
import { connect } from 'react-redux'
const pkg = require('../../package.json')
import { AllProducts } from '../components'

class HomeItems extends Component {
  render() {
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

        <AllProducts home={true} />
      </div>
    )
  }
}

const mapProducts = state => {
  return {
    state
  }
}

export const Home = connect(mapProducts)(HomeItems)
