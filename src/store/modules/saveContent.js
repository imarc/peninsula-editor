/**
 * @function saveContent
 * @param Object commit event object for Vuex commit
 */

// Dependencies
import axios from 'axios'

export default function saveContent ({ commit }) {
  commit('setIsSaving', true)

  const promises = []

  Object.keys(this.state.collections).forEach(collection => {
    promises.push(
      axios.patch(`/api/v1/${collection}/`, this.state.collections[collection], {
        headers: {
          'X-CSRF-Token': this.state.token
        }
      })
    )
  })

  Promise.all(promises).then(() => {
    this.dispatch('setIsEditing', false)
    commit('setIsSaving', false)
    commit('setEditingNode', null)
  })
}
