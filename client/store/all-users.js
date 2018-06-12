import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'

/**
 * INITIAL STATE
 */
const defaultAllUsers = []

/**
 * ACTION CREATORS
 */
const getAllUsers = allUsers => ({type: GET_ALL_USERS, allUsers})

/**
 * THUNK CREATORS
 */
export const fetchAllUsers = () => dispatch => {
  axios
    .get('/api/users')
    .then(result => dispatch(getAllUsers(result.data)))
    .catch(err => console.error('Fetching users unsuccessful', err))
}

/**
 * REDUCER
 */
export default function (state = defaultAllUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.allUsers
    default:
      return state
  }
}
