/**
 * @function openModulesSettings
 * @param Object commit event object for Vuex commit
 * @param Object Specific module who's settings need to be updated
 */

export default function openModulesSettings (module) {
  this.setCurrentModule(module)
  this.setIsUpdatingModule(true)
}
