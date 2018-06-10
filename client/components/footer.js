import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, updateLocation } from '../store'

//Path details for each navbar link
const pathMap = [
  {
    path: '/home',
    name: 'My Settings',
    showWhenLoggedIn: true,
    showWhenLoggedOut: false
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
  }
]

const Footer = ({ location, handleClick, checkLocation, isLoggedIn }) => {

  //Set active class on link click
  const setActive = (path) => {
    return location === path ? 'footer-item active' : 'footer-item'
  }

  return (

    <div className="footer-bar-container">
        {isLoggedIn ? (
          <div className="footer-bar">
            
            {/* The navbar will show these links after you log in */}
            {/* Map all links based on path map object and login preference */}
            {pathMap.filter(link => link.showWhenLoggedIn).map(link => {
              return (
                <Link key={link.name} onClick={() => checkLocation(link.path)} className={setActive(link.path)} to={link.path}>{link.name}</Link>
              )
            })}

            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
            <div className="footer-bar">

              {/* The navbar will show these links before you log in */}
              {/* Map all links based on path map object and login preference */}
              {pathMap.filter(link => link.showWhenLoggedOut).map(link => {
              return (
                <Link key={link.name} onClick={() => checkLocation(link.path)} className={setActive(link.path)} to={link.path}>{link.name}</Link>
              )
            })}

            </div>
          )}
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

export default connect(mapState, mapDispatch)(Footer)
