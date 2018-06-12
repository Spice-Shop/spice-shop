import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allUsers from './all-users'
import products from './products'
import cart from './cart'
import location from './navbar'
import orderHistory from './order-history'

const reducer = combineReducers({user, products, cart, location, allUsers, orderHistory})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './all-users'
export * from './products'
export * from './cart'
export * from './navbar'
export * from './order-history'
