import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, updateLocation } from '../store'
const pkg = require('../../package.json')

//Path details for each navbar link
const pathMap = [
  {
    path: '/',
    name: 'Home',
    showWhenLoggedIn: true,
    showWhenLoggedOut: true
  },
  {
    path: '/products',
    name: 'Products',
    showWhenLoggedIn: true,
    showWhenLoggedOut: true
  },
  {
    path: '/login',
    name: 'Login',
    showWhenLoggedIn: false,
    showWhenLoggedOut: true
  },
  {
    path: '/signup',
    name: 'Signup',
    showWhenLoggedIn: false,
    showWhenLoggedOut: true
  },
  {
    path: '/user',
    name: 'Order History',
    showWhenLoggedIn: true,
    showWhenLoggedOut: false
  },
  {
    path: '/cart',
    name: 'Cart',
    showWhenLoggedIn: true,
    showWhenLoggedOut: true
  }
]

const Navbar = ({ location, handleClick, checkLocation, isLoggedIn }) => {

  //Set active class on link click
  const setActive = (path) => {
    return location === path ? 'nav-item active' : 'nav-item'
  }

  return (

    <div className="nav-bar-container">
      <Link to="/">
        <div className="nav-bar-title-container">
          <div className="nav-bar-organic-image" />
          <h1 className="nav-bar-title">{pkg.title}</h1>
        </div>
      </Link>
      <nav>
        {isLoggedIn ? (
          <div className="nav-bar">

            {/* The navbar will show these links after you log in */}
            {/* Map all links based on path map object and login preference */}
            {pathMap.filter(link => link.showWhenLoggedIn).map(link => {
              return (
                <Link key={link.name} onClick={() => checkLocation(link.path)} className={setActive(link.path)} to={link.path}>{link.name}</Link>
              )
            })}

            <a href="#" className="nav-item" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
            <div className="nav-bar">

              {/* The navbar will show these links before you log in */}
              {/* Map all links based on path map object and login preference */}
              {pathMap.filter(link => link.showWhenLoggedOut).map(link => {
                return (
                  <Link key={link.name} onClick={() => checkLocation(link.path)} className={setActive(link.path)} to={link.path}>{link.name}</Link>
                )
              })}

            </div>
          )}
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    location: state.location
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    //update state location on click
    checkLocation(path) {
      dispatch(updateLocation(path))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
