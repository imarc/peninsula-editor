/**
 * @function removeModule
 * @param Object commit event object for Vuex commit
 * @param Object Module
 */

export default function removeModule (module) {
  this.setIsEditing(true)

  /**
     * Collect nested module data and store in array for removal
     */
  const nestedModules = [...module.node.querySelectorAll('[data-module]')]
  const moduleDataToRemove = this.modules.filter(
    moduleObj => nestedModules.indexOf(moduleObj.node) !== -1
  )
  moduleDataToRemove.push(module)

  /**
     * Remove node from DOM
     */
  this.context.nestedModules = this.context.nestedModules.filter(
    node => node !== module.node
  )
  module.node.remove()

  /**
     * Remove data from state
     */
  this.removeModuleData(moduleDataToRemove)
  this.updateHighlights()
  this.setHighlightedModule(null)
}
