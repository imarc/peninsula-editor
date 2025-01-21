/**
 * @function closeModuleSettings
 * @param Object commit event object for Vuex commit
 */

export default function closeModuleSettings () {
  this.setIsUpdatingModule(false)
}
