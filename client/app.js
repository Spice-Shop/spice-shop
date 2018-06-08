import React, { Component } from 'react'
import { Navbar } from './components'
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
    console.log(this.props)
    return (
      <div>
        <Navbar />
        <Routes />
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
