/**
 * @function saveContent
 * @param Object commit event object for Vuex commit
 */

// Dependencies
import axios from 'axios'

export default function saveContent () {
  this.isSaving = true

  const promises = []

  Object.keys(this.collections).forEach(collection => {
    promises.push(
      axios.patch(`/api/v1/${collection}/`, this.collections[collection], {
        headers: {
          'X-CSRF-Token': this.token
        }
      })
    )
  })

  Promise.all(promises).then(() => {
    this.setIsEditing(false)
    this.isSaving = false
    this.setEditingNode(null)
  })
}
