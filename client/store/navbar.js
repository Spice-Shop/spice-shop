import axios from 'axios'

/* INITIAL STATE */
const initialLocation = window.location.pathname

/* ACTION TYPES */
const GET_LOCATION = 'GET_LOCATION'

/* ACTION CREATORS */
export const updateLocation = location => ({type: GET_LOCATION, location})

/* REDUCER */
export default function (state = initialLocation, action) {
  switch (action.type) {
    case GET_LOCATION:
      return action.location
    default:
      return state
  }
}
