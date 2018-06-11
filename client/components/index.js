/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Header} from './header'
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {AllProducts} from './products/all-products'
export {Home} from './home'
export {Cart} from './cart/cart'
export {default as Footer} from './footer'
export {SingleProduct} from './products/single-product'
