import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AllProducts } from './products/all-products'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, isAdmin, allUsers} = props
  return isAdmin ? (
    <div className="main-product-container">
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
        <div className="parent-product-container">
          {allUsers.length ? (
            allUsers.map(user => {
            return (
            <div key={user.id} className="product-container">
              <div className="product-id">User ID: {user.id}</div>
              <div className="product-email">User Email: {user.email}</div>
              <div className="product-admin">User Type: {user.isAdmin ? 'Admin User' : 'Standard User'}</div>
            </div>
            )}
          )
          ) : (
            <h2>There are currently no users to manage</h2>
          )}
        </div>
      </div>
    </div>
  ) : (
    <h3>Welcome, {email}</h3>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    allUsers: state.allUsers,
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
