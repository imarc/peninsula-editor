/**
 * @function getModules
 * @param Object commit event object for Vuex commit
 */

// Dependencies
import axios from 'axios'

export default function getModules ({ commit }) {
  axios.get('/api/v1/cms/modules/').then(response => {
    /* Check if additional module specific data needs to be fetched */
    Object.keys(response.data).forEach(key => {
      const { parameters } = response.data[key]

      if (typeof parameters !== 'undefined') {
        Object.keys(parameters).forEach(async parameterKey => {
          const { options } = parameters[parameterKey]

          if (options.indexOf('url(') === 0) {
            const requestUrl = options.match(/'((?:\\.|[^'\\])*)'/)[1]

            response.data[key].parameters[parameterKey].options = await axios.get(requestUrl).then(res => res.data)
          }
        })
      }
    })

    commit('setModules', response.data)
  })
}
