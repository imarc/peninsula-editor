/**
 * @function getModules
 * @param Object commit event object for Vuex commit
 */

// Dependencies
import axios from 'axios'
import { isArray, isObject } from 'lodash'

export default function getModules () {
  axios.get('/api/v1/cms/modules/').then(response => {
    /* Check if additional module specific data needs to be fetched */
    Object.keys(response.data).forEach(key => {
      const { parameters } = response.data[key]

      if (typeof parameters !== 'undefined') {
        Object.keys(parameters).forEach(async parameterKey => {
          const { options } = parameters[parameterKey]

          if (isArray(options) && isObject(options[0])) {
            response.data[key].parameters[parameterKey].options = options
          } else if (isArray(options)) {
            response.data[key].parameters[parameterKey].options = options.map(option => {
              return {
                label: option,
                value: option
              }
            })
          } else if (isObject(options)) {
            const keys = Object.getOwnPropertyNames(options)
            const staticArray = []
            keys.forEach(key => {
              staticArray.push({ label: options[key], value: key })
            })
            response.data[key].parameters[parameterKey].options = staticArray
          }

          if (typeof options !== 'undefined' && options.indexOf('url(') === 0) {
            const requestUrl = options.match(/'((?:\\.|[^'\\])*)'/)[1]

            const fetchedOptions = await axios.get(requestUrl).then(res => res.data)
            let finalArray = []

            if (isArray(fetchedOptions) && isObject(fetchedOptions[0])) {
              finalArray = fetchedOptions
            } else if (isArray(fetchedOptions)) {
              fetchedOptions.forEach(option => {
                finalArray.push({ label: option, value: option })
              })
            } else {
              const keys = Object.getOwnPropertyNames(fetchedOptions)
              keys.forEach(key => {
                finalArray.push({ label: fetchedOptions[key], value: key })
              })
            }

            response.data[key].parameters[parameterKey].options = finalArray
          }
        })
      }
    })

    this.availibleModules = response.data
  })
}
