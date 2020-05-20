/**
 * @function closeModulesList
 * @param Object commit event object for Vuex commit
 */

export default function closeModulesList ({ commit }) {
  commit('setIsModuleMode', false)
}
