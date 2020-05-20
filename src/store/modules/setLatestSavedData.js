/**
 * @function setLatestSavedData
 * @param Object commit event object for Vuex commit
 * @param Boolean what to set boolean value to for editing
 */

// Dependencies
import { cloneDeep } from 'lodash'

export default function setLatestSavedData ({ commit }, object) {
  const clonedObj = cloneDeep(object)
  commit('setLatestSavedData', clonedObj)
}
