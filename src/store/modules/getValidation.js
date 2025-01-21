/**
 * @function getValidation
 * @param Object commit event object for Vuex commit
 */

// Dependencies
import axios from 'axios'

export default function getValidation () {
  axios.get('/api/v1/csrf').then(response => {
    this.setToken(response.data)
  })
}
