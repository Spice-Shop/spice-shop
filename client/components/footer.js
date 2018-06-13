import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, updateLocation } from '../store'
const pkg = require('../../package.json')

//Path details for each navbar link
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
    path: '/order-history',
    name: 'Order History',
    showWhenLoggedIn: true,
    showWhenLoggedOut: false
  }
]

const Footer = ({ location, handleClick, checkLocation, isLoggedIn }) => {

  //Set active class on link click
  const setActive = (path) => {
    return location === path ? 'footer-item active' : 'footer-item'
  }

  return (

    <div className="footer-bar-container">
      <div className="footer-bar-content">
        <div className="footer-bar-title-container">
          <h1 className="footer-bar-title">{pkg.title}</h1>
          <div className="footer-bar-copy">Copyright 2018 {pkg.title}</div>
        </div>
        {isLoggedIn ? (
          <div className="footer-bar">

            {/* The navbar will show these links after you log in */}
            {/* Map all links based on path map object and login preference */}
            {pathMap.filter(link => link.showWhenLoggedIn).map(link => {
              return (
                <Link key={link.name} onClick={() => checkLocation(link.path)} className={setActive(link.path)} to={link.path}>{link.name}</Link>
              )
            })}

            <a className="footer-item" href="#" onClick={handleClick}>
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
        <div className="footer-bar-kit">
          <div className="footer-bar-kit-title">Keep In Touch</div>
          <div className="footer-bar-kit-message">
            Subscribe to {pkg.name} today and receive the latest spicy deals, delivered straight to your inbox!
          </div>
        </div>
      </div>
      <div className="footer-bar-social-container">
        <div className="footer-bar-social-icon">Social icons should be lined up in this area of the footer</div>
        <div className="footer-bar-social-message">Some long fancy message should be written here that takes up a lot of space to make the footer look really cool. Moreover the footer should be filled with sentences. Punctuation is key to the human eye! Short sentences are great. Long sentences are nice for ending this very long paragraph.</div>
      </div>
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
