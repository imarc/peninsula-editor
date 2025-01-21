/**
 * @function closeModulePrompt
 * @param Object commit event object for Vuex commit
 */

export default function closeModulePrompt () {
  this.setIsSelectingModule(false)
}
