/**
 * @function resetContent
 * @param Object commit event object for Vuex commit
 */

export default function resetContent ({ commit }) {
  /**
   * Loops through each field and and resets it's innerHTML with the last saved content
   */
  this.state.fields.forEach(field => {
    /**
     * Checks if current field has a key or
     * collection already assigned to it.
     * Otherwise, find next parent that has it assigned.
     */
    const collectionName =
            typeof field.dataset.collection !== 'undefined'
              ? field.dataset.collection
              : field.closest('[data-collection]').dataset.collection
    const keyName =
            typeof field.dataset.key !== 'undefined'
              ? field.dataset.key
              : field.closest('[data-key]').dataset.key

    const fieldName = field.dataset.field

    // Throw error if field doesn't have both a key and collection identifier
    if (typeof collectionName === 'undefined' || typeof keyName === 'undefined') {
      throw new Error(
                `Field ${fieldName} does not have an associated key or collection name, double check your markup for missing attributes.`
      )
    }

    field.innerHTML = this.state.latestSavedData[collectionName][keyName][fieldName]
  })

  commit('setIsModuleMode', false)
  this.dispatch('initialDataConstruct')
  this.dispatch('editorApply')
  this.dispatch('moduleCollect')
  commit('setIsEditing', false)
}
