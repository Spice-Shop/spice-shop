import React, { Component } from 'react'
import { Header, Navbar, Footer } from './components'
import Routes from './routes'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProducts } from './store/products'
import { fetchCart } from './store/cart'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchInitialData()
  }

  componentDidUpdate() {
    this.props.userId && this.props.fetchCart(this.props.userId)
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

const mapStateToProps = (state) => {
  return {
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialData: () => dispatch(fetchProducts()),
    fetchCart: (userId) => dispatch(fetchCart(userId))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
