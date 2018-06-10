import React, { Component } from 'react'
import { Header, Navbar, Footer } from './components'
import Routes from './routes'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProducts } from './store/products'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchInitialData()
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        <Navbar />
        <div className="main-container">
          <Routes />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialData: () => dispatch(fetchProducts())
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
