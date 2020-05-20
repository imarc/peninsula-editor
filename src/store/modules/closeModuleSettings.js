/**
 * @function closeModuleSettings
 * @param Object commit event object for Vuex commit
 */

export default function closeModuleSettings ({ commit }) {
  commit('setIsUpdatingModule', false)
}
