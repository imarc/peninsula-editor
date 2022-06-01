/**
 * @function saveContent
 * @param Object commit event object for Vuex commit
 */

// Dependencies
import axios from 'axios'
import loadScripts from './_loadScripts'

export default function saveContent ({ commit }) {

  const htmlNodes = [...document.querySelectorAll('[data-editor="html"]')]
  const promises  = []

  htmlNodes.forEach(node => {
    if (node.dataset.dynamicContent) {
      node.innerHTML = node.dataset.dynamicContent
    }
  })

  commit('setIsSaving', true)

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

    htmlNodes.forEach(node => {
      if (node.dataset.dynamicContent) {
        loadScripts([...node.querySelectorAll('script')])
      }
    })
  })
}
