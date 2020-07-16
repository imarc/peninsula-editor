/**
 * @function updateModuleOrder
 * @param Object commit event object for Vuex commit
 * @param Array array of module ids in new order
 */

export default function openModulesList ({ commit }, orderArray) {
  const { context } = this.state
  const { modules } = this.state

  commit('setIsEditing', true)

  /**
     * Create module data array based on order of module IDs
     */
  const relatedModuleData = orderArray.map(id => {
    let correspondingModule = {}

    modules.forEach(module => {
      if (module.id === id) {
        correspondingModule = module
      }
    })

    return correspondingModule
  })

  /**
     * Clean up highlight classes
     */
  context.nestedModules.forEach(module => {
    module.classList.remove('-highlight')
  })

  /**
     * Remove modules from visible dom
     */
  while (context.node.firstChild) {
    context.node.removeChild(context.node.firstChild)
  }

  /**
     * Reappend same referenced nodes in new order
     */
  relatedModuleData.forEach(module => {
    context.node.append(module.node)
  })

  /**
     * Update data representation for current container
     */
  commit('setContextModules', relatedModuleData)
  this.dispatch('updateHighlights')
}
