/**
 * @function openModulesSettings
 * @param Object commit event object for Vuex commit
 * @param Object Specific module who's settings need to be updated
 */

export default function openModulesSettings ({ commit }, module) {
  commit('setCurrentModule', module)
  commit('setIsUpdatingModule', true)
}
