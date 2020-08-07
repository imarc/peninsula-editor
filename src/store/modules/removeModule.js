/**
 * @function removeModule
 * @param Object commit event object for Vuex commit
 * @param Object Module
 */

export default function removeModule ({ commit }, module) {
  commit('setIsEditing', true)

  /**
     * Collect nested module data and store in array for removal
     */
  const nestedModules = [...module.node.querySelectorAll('[data-module]')]
  const moduleDataToRemove = this.state.modules.filter(
    moduleObj => nestedModules.indexOf(moduleObj.node) !== -1
  )
  moduleDataToRemove.push(module)

  /**
     * Remove node from DOM
     */
  this.state.context.nestedModules = this.state.context.nestedModules.filter(
    node => node !== module.node
  )
  module.node.remove()

  /**
     * Remove data from state
     */
  commit('removeModuleData', moduleDataToRemove)
  this.dispatch('updateHighlights')
  this.dispatch('setHighlightedModule', null)
}
