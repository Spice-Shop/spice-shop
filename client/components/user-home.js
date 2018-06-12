import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {AllProducts} from './products/all-products'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, isAdmin} = props
  return isAdmin ? (
    <div>
    <div>
      <h3>Welcome, {email}</h3>
    </div>
    <div>
        <h3>MANAGE PRODUCTS</h3>
        <div>
        <AllProducts />
        </div>
    </div>
    <div>
        <h3>MANAGE USERS</h3>
       
    </div>
    </div>
  )
  : (<h3>Welcome, {email}</h3>)
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
