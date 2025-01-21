/**
 * @function closeModulesList
 * @param Object commit event object for Vuex commit
 */

export default function closeModulesList () {
  this.setIsModuleMode(false)
}
