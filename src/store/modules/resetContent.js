/**
 * @function resetContent
 * @param Object commit event object for Vuex commit
 */

export default function resetContent () {
  /**
     * Loops through each field and and resets it's innerHTML with the last saved content
     */
  this.fields.forEach(field => {
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

    if (field instanceof HTMLImageElement) {
        field.src = this.latestSavedData[collectionName][keyName][fieldName];
    } else {
        field.innerHTML = this.latestSavedData[collectionName][keyName][fieldName];
    }
  })

  this.setIsModuleMode(false)
  this.initialDataConstruct()
  this.editorApply()
  this.moduleCollect()
  this.setIsEditing(false)
}
