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

const Header = ({ location, handleClick, checkLocation, isLoggedIn, email }) => {

    //Set active class on link click
    const setActive = (path) => {
        return location === path ? 'header-item active' : 'header-item'
    }

    return (

        <div className="header-bar-container">
            {isLoggedIn ? (
                <div className="header-bar">

                    {/* The navbar will show these links after you log in */}
                    {/* Map all links based on path map object and login preference */}
                    <div className="header-item header-logged-in-message">Welcome, {email}</div>
                    {pathMap.filter(link => link.showWhenLoggedIn).map(link => {
                        return (
                            <Link key={link.name} onClick={() => checkLocation(link.path)} className={setActive(link.path)} to={link.path}>{link.name}</Link>
                        )
                    })}

                    <a href="#" className="header-item" onClick={handleClick}>
                        Logout
                    </a>
                </div>
            ) : (
                    <div className="header-bar">

                        <div className="header-item header-message"><Link to="/signup">Signup</Link> to manage your order history</div>
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
        location: state.location,
        email: state.user.email
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

export default connect(mapState, mapDispatch)(Header)
