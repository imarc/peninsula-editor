/**
 * @function updateModuleOrder
 * @param Object commit event object for Vuex commit
 * @param Array array of module ids in new order
 */

export default function openModulesList (orderArray) {
  this.setIsEditing(true)

  /**
     * Create module data array based on order of module IDs
     */
  const relatedModuleData = orderArray.map(id => {
    let correspondingModule = {}

    this.modules.forEach(module => {
      if (module.id === id) {
        correspondingModule = module
      }
    })

    return correspondingModule
  })

  /**
     * Clean up highlight classes
     */
  this.context.nestedModules.forEach(module => {
    module.classList.remove('-highlight')
  })

  /**
     * Remove modules from visible dom
     */
  while (this.context.node.firstChild) {
    this.context.node.removeChild(this.context.node.firstChild)
  }

  /**
     * Reappend same referenced nodes in new order
     */
  relatedModuleData.forEach(module => {
    this.context.node.append(module.node)
  })

  /**
     * Update data representation for current container
     */
  this.context.nestedModules = moduleData.map(module => module.node);
  this.updateHighlights()
}
