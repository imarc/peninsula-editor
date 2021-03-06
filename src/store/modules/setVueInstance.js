/**
 * @function setVueInstance
 * @param Object commit event object for Vuex commit
 * @param Object Vue Instance
 */

export default function setVueInstance ({ commit }, instance) {
  commit('setVueInstance', instance)
}
